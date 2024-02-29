package com.example.demo.account.service;

import com.example.demo.account.dto.*;
import com.example.demo.account.entity.Account;
import com.example.demo.auth.dto.oauth.OAuthAccountInfoDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

public interface AccountService {

    void createAccount(final SignUpRequestDto signUpRequestDto);

    void createAccountByOAuth(final OAuthAccountInfoDto oAuthAccountInfoDto, final String provider);

    ResponseEntity<UserInfoDto> getUserInfo(final @AuthenticationPrincipal AccountDetails accountDetails);

    ResponseEntity<UserInfoDto> modifyUserInfo(final @AuthenticationPrincipal AccountDetails accountDetails, final ModifyUserInfoRequestDto requestDto);

    Account findAccountByEmail(final String email);

    void deleteAccount(final @AuthenticationPrincipal AccountDetails accountDetails);

    void modifyNotification(final @AuthenticationPrincipal AccountDetails accountDetails, final AgreementUpdateDto agreementUpdateDto);

    void changePassword(final @AuthenticationPrincipal AccountDetails accountDetails, final String newPassword);

    ResponseEntity<UserInfoDto> getUserInfoByEmail(String email);

    UserInfoDto getUserInfoByAccountId(Long accountId);
}
