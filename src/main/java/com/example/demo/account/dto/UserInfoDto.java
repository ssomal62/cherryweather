package com.example.demo.account.dto;

import com.example.demo.account.entity.Account;
import lombok.*;

@Value
public class UserInfoDto {

    String name;
    String email;
    String profileName;
    String phoneNumber;
    String gender;
    String dateOfBirth;
    String profileImage;

    // 생성자를 통해 모든 필드를 초기화합니다.
    public UserInfoDto(Account account){
        this.name = account.getName();
        this.email = account.getEmail();
        this.profileName = account.getProfileName();
        this.phoneNumber = account.getPhoneNumber();
        this.gender = account.getGender();
        this.dateOfBirth = account.getDateOfBirth();
        this.profileImage = account.getProfileImage();
    }

}

