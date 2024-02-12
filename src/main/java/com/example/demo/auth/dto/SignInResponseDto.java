package com.example.demo.auth.dto;

import com.example.demo.account.enums.UserRole;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class SignInResponseDto {

    String userName;
    UserRole userRole;
    String grantType;
    String accessToken;
    String refreshToken;
    Long expiresIn;

}
