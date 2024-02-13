package com.example.demo.auth.service;

import com.example.demo.auth.dto.SignInRequestDto;
import com.example.demo.auth.dto.SignInResponseDto;
import com.example.demo.common.jwt.dto.JwtReissueResponseDto;
import com.example.demo.common.jwt.dto.JwtRequestDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<SignInResponseDto> signIn(final SignInRequestDto signInRequestDto);

    void signOut(final JwtRequestDto jwtRequestDto);

    ResponseEntity<JwtReissueResponseDto> reissue(final JwtRequestDto jwtRequestDto);

}
