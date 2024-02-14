package com.example.demo.auth.controller;

import com.example.demo.auth.dto.SignInResponseDto;
import com.example.demo.auth.dto.oauth.OAuthRequestDto;
import com.example.demo.auth.service.impl.KakaoOAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OAuthController {

    private final KakaoOAuthService kakaoService;
//    private final NaverOAuthService naverService;

    @PostMapping("/kakao/sign-in")
    public ResponseEntity<SignInResponseDto> kakaoSignIn(
            final @RequestBody OAuthRequestDto oAuthRequestDto
    ) {
        return kakaoService.signIn(oAuthRequestDto);
    }

//    @DeleteMapping("/kakao/sign-out")
//    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
//    public ResponseEntity<Void> signOut(
//            final @AuthenticationPrincipal AccountDetails accountDetails
//    ) {
//        return kakaoService.signOut(accountDetails);
//    }

//    @PostMapping("/naver/sign-in")
//    public ResponseEntity<SignInResponseDto> naverSignIn(
//            final @RequestBody OAuthRequestDto oAuthRequestDto
//    ) {
//        return naverService.signIn(oAuthRequestDto);
//    }

}
