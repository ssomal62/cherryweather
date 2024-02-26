package com.example.demo.account.dto;

import com.example.demo.account.enums.ActivityAreaType;
import lombok.Data;

import java.util.List;

@Data
public class ModifyUserInfoRequestDto {

    private String password;
    private String profileName;
    private String phoneNumber;
    private String profileImage;
    private List<String> interests;
    private List<ActivityAreaModification> activityAreas;
    private Boolean agreementGetNotified;


    @Data
    public static class ActivityAreaModification {
        private ActivityAreaType type;
        private String location;

        public ActivityAreaModification(ActivityAreaType type, String location) {
            this.type = type;
            this.location = location;
        }
    }
}