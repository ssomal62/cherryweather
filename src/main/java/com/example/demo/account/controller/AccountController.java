package com.example.demo.account.controller;

import com.example.demo.account.dto.*;
import com.example.demo.account.service.impl.AccountServiceImpl;
import com.example.demo.common.service.FileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/account")
public class AccountController {

    private final AccountServiceImpl accountService;
    private final FileService fileService;

    /**
     * 회원가입
     */
    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.CREATED)
    public void signUp(final @Valid @RequestBody SignUpRequestDto signUpRequestDto) {
        accountService.createAccount(signUpRequestDto);
    }

    /**
     * 내 정보 조회
     */
    @GetMapping("/user-info")
    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserInfoDto> getUserInfo(@AuthenticationPrincipal AccountDetails accountDetails) {
        return accountService.getUserInfo(accountDetails);
    }

    /**
     * 내 정보 수정
     */
    @PatchMapping("/my-info/modify")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER')")
    public ResponseEntity<UserInfoDto> modifyAccount(
            @AuthenticationPrincipal AccountDetails accountDetails,
            @RequestBody ModifyUserInfoRequestDto requestDto
    ) {
        return accountService.modifyUserInfo(accountDetails, requestDto);
    }

    /**
     * 알림 설정 수정
     */
    @PatchMapping("/notification/modify")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER')")
    public void modifyNotification(
            @AuthenticationPrincipal AccountDetails accountDetails,
            @RequestBody AgreementUpdateDto agreementUpdateDto
    ) {
        accountService.modifyNotification(accountDetails, agreementUpdateDto);
    }

    /**
     * 회원 탈퇴
     */
    @DeleteMapping("/drop-out")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER')")
    public ResponseEntity<String> dropOut(
            final @AuthenticationPrincipal AccountDetails accountDetails,
            @RequestParam String password
    ) {
        accountService.checkPasswordIsCorrect(password, accountDetails.getAccount());
        accountService.deleteAccount(accountDetails);
        return ResponseEntity.ok("Account successfully deleted");
    }

    /**
     * 이메일 중복체크 확인
     */
    @GetMapping("/check-email")
    @ResponseStatus(HttpStatus.CREATED)
    public void checkDuplicateEmail(final @Valid @RequestParam String email) {
        accountService.checkDuplicateEmail(email);
    }

    /**
     * 패스워드 변경
     */
    @PostMapping("/change-password")
    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER')")
    public ResponseEntity<String> changePassword(@AuthenticationPrincipal AccountDetails accountDetails,
                                                 @RequestBody PasswordChangeRequestDto requestDto) {
        // 이전 비밀번호 검증
        accountService.checkPasswordIsCorrect(requestDto.getOldPassword(), accountDetails.getAccount());
        // 새 비밀번호로 변경
        accountService.changePassword(accountDetails, requestDto.getNewPassword());
        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다!");
    }

    /**
     * 프로필 이미지 저장
     */
    @PostMapping("/profile-upload")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> createUserProfile(
            @RequestParam(value = "file") MultipartFile file) {
        fileService.uploadSingleFile(file,"user-profile");
        return ResponseEntity.ok().build();
    }


    // 이메밀로 user 정보 가져오기
    @GetMapping("/getfinduser")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserInfoDto> findAccountByEmail(@RequestParam String email) {
        return accountService.getUserInfoByEmail(email);
    }

    // accountId로 user 정보 가져오기
    @GetMapping("/getfinduserbyid")
    @ResponseStatus(HttpStatus.OK)
    public UserInfoDto findAccountByAccountId(@RequestParam Long accountId) {
        return accountService.getUserInfoByAccountId(accountId);
    }





   }
