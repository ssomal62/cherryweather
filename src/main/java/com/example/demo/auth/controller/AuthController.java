package com.example.demo.auth.controller;

import com.example.demo.auth.dto.SignInRequestDto;
import com.example.demo.auth.dto.SignInResponseDto;
import com.example.demo.auth.service.impl.AuthServiceImpl;
import com.example.demo.common.jwt.dto.JwtReissueResponseDto;
import com.example.demo.common.jwt.dto.JwtRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthServiceImpl authService;
//    private final EmailService emailService;

    @PostMapping("/sign-in")
    public ResponseEntity<SignInResponseDto> signIn(
            final @Valid @RequestBody SignInRequestDto signInRequestDto
    ) {
        return authService.signIn(signInRequestDto);
    }

    /**
     * 로그아웃
     */
    @DeleteMapping("/sign-out")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SELLER') or hasRole('ROLE_ADMIN')")
    public void signOut(
            final @RequestBody JwtRequestDto jwtRequestDto
    ) {
        authService.signOut(jwtRequestDto);
    }

    /**
     * 토큰 재발급
     */
    @PostMapping("/re-issue")
    public ResponseEntity<JwtReissueResponseDto> reissue(
            final @RequestBody JwtRequestDto jwtRequestDto
    ) {
        return authService.reissue(jwtRequestDto);
    }

}
