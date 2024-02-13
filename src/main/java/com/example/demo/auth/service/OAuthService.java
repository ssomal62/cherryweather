package com.example.demo.auth.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.auth.dto.SignInResponseDto;
import com.example.demo.auth.dto.oauth.OAuthRequestDto;
import org.springframework.http.ResponseEntity;

public interface OAuthService {

    public ResponseEntity<SignInResponseDto> signIn(final OAuthRequestDto oAuthRequestDto);

    public ResponseEntity<Void> signOut(final AccountDetails accountDetails);
}
