package com.example.demo.membership.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ClubSignupDTO(
        @Positive
        @NotNull
        long clubId,

        @Email(message = "[userEmail] 올바른 이메일 형식이 아닙니다.")
        String userEmail,

        @NotBlank(message = "[screenName]은 공백일 수 없습니다.")
        String screenName
) {
}