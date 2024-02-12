package com.example.demo.account.service.impl;
import com.example.demo.account.dto.AccountDetails;
import com.example.demo.account.dto.ModifyUserInfoRequestDto;
import com.example.demo.account.dto.SignUpRequestDto;
import com.example.demo.account.dto.UserInfoDto;
import com.example.demo.account.entity.Account;
import com.example.demo.account.entity.ActivitiesArea;
import com.example.demo.account.entity.Agreement;
import com.example.demo.account.entity.Interest;
import com.example.demo.account.repository.AccountRepository;
import com.example.demo.account.repository.ActivitiesAreaRepository;
import com.example.demo.account.repository.AgreementRepository;
import com.example.demo.account.repository.InterestRepository;
import com.example.demo.account.service.AccountService;
import com.example.demo.common.exception.DuplicatedException;
import com.example.demo.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.demo.common.exception.enums.ExceptionStatus.CONFLICT_ACCOUNT;
import static com.example.demo.common.exception.enums.ExceptionStatus.NOT_FOUND_ACCOUNT;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final InterestRepository interestRepository;
    private final AgreementRepository agreementRepository;
    private final ActivitiesAreaRepository activitiesAreaRepository;
    private final PasswordEncoder passwordEncoder;

    // ## 회원 가입 ## //
    @Transactional
    @Override
    public void createAccount(final SignUpRequestDto signUpRequestDto) {
        // 회원 정보 저장
        String encodedPassword = passwordEncoder.encode(signUpRequestDto.getPassword());
        Account account = accountRepository.save(signUpRequestDto.toAccountEntity(encodedPassword));

        // 회원 관심사 저장
        List<Interest> interests = signUpRequestDto.toInterestEntities(account);
        interestRepository.saveAll(interests);

        // 회원 약관 동의 저장
        Agreement agreement = signUpRequestDto.toAgreementEntity(account);
        agreementRepository.save(agreement);

        // 회원 활동 지역 저장
        List<ActivitiesArea> activitiesAreas = signUpRequestDto.toActivitiesAreaEntities(account);
        activitiesAreaRepository.saveAll(activitiesAreas);
    }

    // ## 유저 정보 ## //
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<UserInfoDto> getUserInfo(final AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();
        account = accountRepository.findById(account.getAccountId())
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_ACCOUNT)); // 계정 정보 재조회


        List<String> interests = account.getInterests().stream()
                .map(Interest::getInterestName)
                .collect(Collectors.toList());

        List<UserInfoDto.ActivityAreaInfo> activityAreas = account.getActivitiesAreas().stream()
                .map(area -> new UserInfoDto.ActivityAreaInfo(area.getType(), area.getLocation()))
                .collect(Collectors.toList());

        // 수정된 UserInfoDto 생성자를 사용하여 DTO 생성
        UserInfoDto userInfoDto = new UserInfoDto(account, interests, activityAreas);

        return ResponseEntity.ok().body(userInfoDto);
    }

    @Override
    @Transactional
    public ResponseEntity<UserInfoDto> modifyUserInfo(final AccountDetails accountDetails, final ModifyUserInfoRequestDto requestDto) {
        Long accountId = accountDetails.getAccount().getAccountId();
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));

        // 비밀번호 업데이트
        if (requestDto.getPassword() != null && !requestDto.getPassword().isEmpty()) {
            account.updatPassword(passwordEncoder.encode(requestDto.getPassword()));
        }

        // 프로필 이름 업데이트
        if (requestDto.getProfileName() != null) {
            account.updatProfileName(requestDto.getProfileName());
        }

        // 전화번호 업데이트
        if (requestDto.getPhoneNumber() != null) {
            account.updatPhoneNumber(requestDto.getPhoneNumber());
        }

        // 프로필 이미지 업데이트
        if (requestDto.getProfileImage() != null) {
            account.updatProfileImage(requestDto.getProfileImage());
        }

        // 기존 관심사 정보 삭제
        if (!account.getInterests().isEmpty()) {
            interestRepository.deleteAll(account.getInterests()); // 계정에 연결된 모든 관심사 삭제
            account.getInterests().clear(); // 계정 내부 컬렉션에서 관심사 참조 제거
        }

        // 새로운 관심사 정보 추가
        List<Interest> newInterests = requestDto.getInterests().stream()
                .map(interestName -> new Interest(account, interestName))
                .collect(Collectors.toList());
        interestRepository.saveAll(newInterests); // 새 관심사 저장
        account.getInterests().addAll(newInterests);

        List<ActivitiesArea> existingActivitiesAreas = new ArrayList<>(account.getActivitiesAreas()); // 기존 활동 지역 복사
        activitiesAreaRepository.deleteAll(existingActivitiesAreas); // 기존 활동 지역 정보 삭제
        account.getActivitiesAreas().clear(); // 계정에서 기존 활동 지역 관계 제거

        // 새 활동 지역 추가
        List<ActivitiesArea> newActivityAreas = requestDto.getActivityAreas().stream()
                .map(area -> new ActivitiesArea(account, area.getType(), area.getLocation()))
                .collect(Collectors.toList());
        activitiesAreaRepository.saveAll(newActivityAreas); // 새 활동 지역 저장
        account.getActivitiesAreas().addAll(newActivityAreas);

        // 관심사 목록 추출
        List<String> interests = account.getInterests()
                .stream()
                .map(Interest::getInterestName)
                .collect(Collectors.toList());

        // 활동 지역 목록 추출
        List<UserInfoDto.ActivityAreaInfo> activityAreas = account.getActivitiesAreas()
                .stream()
                .map(area -> new UserInfoDto.ActivityAreaInfo(area.getType(), area.getLocation()))
                .collect(Collectors.toList());

        accountRepository.save(account); // 계정 정보 업데이트
        UserInfoDto userInfoDto = new UserInfoDto(account, interests, activityAreas);
        return ResponseEntity.ok(userInfoDto);
    }


    @Override
    public Account findAccountByEmail(final String email) {
        return accountRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_ACCOUNT));
    }

    // 회원 탈퇴
    @Override
    @Transactional
    public void deleteAccount(final AccountDetails accountDetails) {
        accountRepository.delete(accountDetails.getAccount());
    }

    // 이메일 중복 체크
    public void checkDuplicateEmail(String email) {
        checkEmailIsDuplicated(email);
    }

    // 이메일 중복 체크
    private void checkEmailIsDuplicated(String email) {
        if (accountRepository.existsByEmail(email)) {
            throw new DuplicatedException(CONFLICT_ACCOUNT);
        }
    }

}
