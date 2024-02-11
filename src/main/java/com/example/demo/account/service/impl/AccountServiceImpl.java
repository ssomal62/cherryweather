package com.example.demo.account.service.impl;
import com.example.demo.account.dto.AccountDetails;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.demo.common.exception.enums.ExceptionStatus.CONFLICT_ACCOUNT;
import static com.example.demo.common.exception.enums.ExceptionStatus.NOT_FOUND_ACCOUNT;

@Service
@Slf4j
@Repository
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
