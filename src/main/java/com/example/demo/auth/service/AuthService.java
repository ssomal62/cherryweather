package com.example.demo.auth.service;

import com.example.demo.auth.dto.SignInRequestDto;
import com.example.demo.auth.dto.SignInResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<SignInResponseDto> signIn(final SignInRequestDto signInRequestDto);

}
