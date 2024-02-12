package com.example.demo.account.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.account.dto.ModifyUserInfoRequestDto;
import com.example.demo.account.dto.SignUpRequestDto;
import com.example.demo.account.dto.UserInfoDto;
import com.example.demo.account.entity.Account;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

public interface AccountService {

    void createAccount(final SignUpRequestDto signUpRequestDto);

    ResponseEntity<UserInfoDto> getUserInfo(final @AuthenticationPrincipal AccountDetails accountDetails);

    ResponseEntity<UserInfoDto> modifyUserInfo(final @AuthenticationPrincipal AccountDetails accountDetails, final ModifyUserInfoRequestDto requestDto);

    Account findAccountByEmail(final String email);

    void deleteAccount(final @AuthenticationPrincipal AccountDetails accountDetails);

}
