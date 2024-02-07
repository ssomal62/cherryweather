package com.example.demo.common.jwt.dto;

import lombok.Builder;

@Builder
public record JwtReissueResponseDto(String accessToken, String refreshToken, Long accessTokenExpiresIn) {

}

