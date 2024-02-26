package com.example.demo.account.dto;

import lombok.Data;

@Data
public class PasswordChangeRequestDto {
    // 수정
    private String oldPassword;
    private String newPassword;
}
