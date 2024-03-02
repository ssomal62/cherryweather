package com.example.demo.account.service.impl;
import com.example.demo.account.dto.*;
import com.example.demo.account.entity.Account;
import com.example.demo.account.entity.ActivitiesArea;
import com.example.demo.account.entity.Agreement;
import com.example.demo.account.entity.Interest;
import com.example.demo.account.enums.ForbiddenUserName;
import com.example.demo.account.enums.RegisterType;
import com.example.demo.account.repository.AccountRepository;
import com.example.demo.account.repository.ActivitiesAreaRepository;
import com.example.demo.account.repository.AgreementRepository;
import com.example.demo.account.repository.InterestRepository;
import com.example.demo.account.service.AccountService;
import com.example.demo.auth.dto.oauth.OAuthAccountInfoDto;
import com.example.demo.auth.dto.oauth.OAuthAccountInfoDto2;
import com.example.demo.common.exception.AuthException;
import com.example.demo.common.exception.DuplicatedException;
import com.example.demo.common.exception.NotFoundException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.demo.account.enums.UserRole.ROLE_CUSTOMER;
import static com.example.demo.account.enums.UserStatus.ACTIVE;
import static com.example.demo.common.exception.enums.ExceptionStatus.*;
import static com.example.demo.common.utils.CodeGenerator.generateRandomCode;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final InterestRepository interestRepository;
    private final AgreementRepository agreementRepository;
    private final ActivitiesAreaRepository activitiesAreaRepository;
    private final ApplicationEventPublisher eventPublisher;
    @Autowired
    private final PasswordEncoder passwordEncoder;

    // ## 회원 가입 ## //
    @Transactional
    @Override
    public void createAccount(final SignUpRequestDto signUpRequestDto) {

        // 이메일 중복체크
        checkDuplicateEmail(signUpRequestDto.getEmail());

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

        // 여기서 Agreement 정보도 조회
        boolean agreementGetNotified = agreementRepository.findByAccountId(account.getAccountId())
                .map(Agreement::isAgreementGetNotified) // 메서드 참조를 사용하여 boolean 값 가져오기
                .orElse(false); // Agreement 정보가 없다면 기본값으로 false 설정

        // 수정된 UserInfoDto 생성자를 사용하여 DTO 생성
        UserInfoDto userInfoDto = new UserInfoDto(account, interests, activityAreas, agreementGetNotified);

        return ResponseEntity.ok().body(userInfoDto);
    }

    @Override
    @Transactional
    public void createAccountByOAuth(final OAuthAccountInfoDto oAuthAccountInfoDto, final String provider) {
        String email = oAuthAccountInfoDto.getEmail();
        String name = oAuthAccountInfoDto.getName();
        String encodedPassword = passwordEncoder.encode(generateRandomCode(10));
        System.out.println("oAuthAccountInfoDto = " + oAuthAccountInfoDto);
        checkUsernameIsProhibited(name);
        checkEmailIsDuplicated(email);

        // 임의 값. 추후에 카카오한테 받아야함
        String phoneNumber = oAuthAccountInfoDto.getPhoneNumber() != null ? oAuthAccountInfoDto.getPhoneNumber() : "000-0000-0000";
        String birthday = "2000-01-01";
        String profileImage = "default_image.jpg";
        String profileName = "default_profile_name";
        String rating = "36.5";


        Account account = Account.builder()
                .oauthId(oAuthAccountInfoDto.getId())
                .email(email)
                .name(name)
                .password(encodedPassword)
                .phoneNumber(phoneNumber)
                .userStatus(ACTIVE)
                .userRole(ROLE_CUSTOMER)
                .registerType(RegisterType.valueOf(provider.toUpperCase()))
                .rating(rating)
                .dateOfBirth(birthday)
                .gender(String.valueOf(oAuthAccountInfoDto.getGender()))
                .profileImage(profileImage)
                .profileName(RegisterType.valueOf(provider.toUpperCase())+" 간편로그인")
                .build();

        accountRepository.save(account);
//      publishWelcomeEvent(account);
    }

    @Override
    @Transactional
    public ResponseEntity<UserInfoDto> modifyUserInfo(final AccountDetails accountDetails, final ModifyUserInfoRequestDto requestDto) {
        Long accountId = accountDetails.getAccount().getAccountId();
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));

        // 어그리먼트 정보 업데이트
        Agreement agreement = agreementRepository.findByAccountId(accountId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Agreement not found"));

        // 비밀번호 업데이트
        if (requestDto.getPassword() != null && !requestDto.getPassword().isEmpty()) {
            account.updatePassword(passwordEncoder.encode(requestDto.getPassword()));
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
            interestRepository.deleteAll(account.getInterests());
            account.getInterests().clear();
        }

        if(requestDto.getAgreementGetNotified() != null) {
            agreement.updateNotification(requestDto.getAgreementGetNotified());
        }

        // 새로운 관심사 정보 추가
        List<Interest> newInterests = requestDto.getInterests().stream()
                .map(interestName -> new Interest(account, interestName))
                .collect(Collectors.toList());
        interestRepository.saveAll(newInterests);
        account.getInterests().addAll(newInterests);

        List<ActivitiesArea> existingActivitiesAreas = new ArrayList<>(account.getActivitiesAreas()); // 기존 활동 지역 복사
        activitiesAreaRepository.deleteAll(existingActivitiesAreas);
        account.getActivitiesAreas().clear();

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
        UserInfoDto userInfoDto = new UserInfoDto(account, interests, activityAreas, agreement.isAgreementGetNotified());
        return ResponseEntity.ok(userInfoDto);
    }

    // 알림 설정 수정
    @Override
    @Transactional
    public void modifyNotification(final AccountDetails accountDetails, AgreementUpdateDto agreementUpdateDto) {
        Long accountId = accountDetails.getAccount().getAccountId();
        Agreement agreement = agreementRepository.findById(accountId)
                .orElseThrow(() -> new EntityNotFoundException("Agreement not found for account ID: " + accountId));

        agreement.updateNotification(agreementUpdateDto.isAgreementGetNotified());
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
        Account account = accountDetails.getAccount();
        account.markAsDeleted();
        accountRepository.save(account);
    }

    @Override
    @Transactional
    public void changePassword(final AccountDetails accountDetails, String newPassword) {
        Account account = accountDetails.getAccount();
        String encodedPassword = passwordEncoder.encode(newPassword);
        account.updatePassword(encodedPassword); // 새 비밀번호 인코딩 및 저장
        accountRepository.save(account);
    }

    /**
     * email 찾기
     *
     * @return
     */
    @Override
    public @Email String findEmail(final FindEmailRequestDto findEmailRequestDto) {
        String name = findEmailRequestDto.getName();
        String phone = findEmailRequestDto.getPhoneNumber();

        Account account = accountRepository.findAccountByNameAndPhoneNumber(name, phone)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_ACCOUNT));

        return account.getEmail();
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

    private void checkUsernameIsProhibited(String username) {
        boolean isProhibited = Arrays.stream(ForbiddenUserName.values())
                .anyMatch(forbiddenUserName -> username.contains(forbiddenUserName.getName()));

        if (isProhibited) {
            throw new AuthException(PROHIBITED_USERNAME);
        }
    }

    public void createAccountByOAuth(OAuthAccountInfoDto2 accountInfo, String provider) {
    }

    public boolean checkPassword(AccountDetails accountDetails, String rawPassword) {
        String storedPasswordHash = accountDetails.getPassword(); // 저장된 패스워드 해시 가져오기
        return passwordEncoder.matches(rawPassword, storedPasswordHash); // 비밀번호 비교
    }

    public void checkPasswordIsCorrect(String requestedPassword, Account account) {
        if (!passwordEncoder.matches(requestedPassword, account.getPassword())) {
            throw new AuthException(INVALID_ID_OR_PW);
        }
    }

    public ResponseEntity<UserInfoDto> getUserInfoByEmail(String email) {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_ACCOUNT)); // 계정 정보 재조회
        return ResponseEntity.ok().body(new UserInfoDto(account, null, null, false));
    }
    @Override
    public UserInfoDto getUserInfoByAccountId(Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_ACCOUNT)); // 계정 정보 재조회
        return new UserInfoDto(account, null, null, false);
    }
}
