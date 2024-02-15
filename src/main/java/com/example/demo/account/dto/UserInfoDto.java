package com.example.demo.account.dto;

import com.example.demo.account.entity.Account;
import com.example.demo.account.entity.Interest;
import com.example.demo.account.enums.ActivityAreaType;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Value
public class UserInfoDto {

    Long accountId;
    String name;
    String email;
    String profileName;
    String phoneNumber;
    String gender;
    String dateOfBirth;
    String profileImage;
    List<String> interests;
    List<ActivityAreaInfo> activityAreas;


    // 생성자를 통해 모든 필드를 초기화합니다.
    public UserInfoDto(Account account, List<String> interests, List<ActivityAreaInfo> activityAreas){
        this.accountId = account.getAccountId();
        this.name = account.getName();
        this.email = account.getEmail();
        this.profileName = account.getProfileName();
        this.phoneNumber = account.getPhoneNumber();
        this.gender = account.getGender();
        this.dateOfBirth = account.getDateOfBirth();
        this.profileImage = account.getProfileImage();
        this.interests = account.getInterests()
                .stream()
                .map(Interest::getInterestName)
                .collect(Collectors.toList());
        this.activityAreas = account.getActivitiesAreas()
                .stream()
                .map(area -> new ActivityAreaInfo(area.getType(), area.getLocation()))
                .collect(Collectors.toList());
    }

    @Value
    @AllArgsConstructor
    public static class ActivityAreaInfo {
        ActivityAreaType type;
        String location;
    }

}

