package com.example.demo.club.enums;

import lombok.Getter;

@Getter
public enum ClubCategory {

    CULTURE_ART("문화·예술"),
    ACTIVITY("액티비티"),
    FOOD_DRINK("푸드·드링크"),
    HOBBY("취미"),
    PARTY_GAME("파티·게임"),
    TRAVEL_COMPANION("여행·동행"),
    SELF_IMPROVEMENT("자기계발"),
    LOCAL_COMMUNITY("동네·또래"),
    FINANCE("재테크"),
    FOREIGN_LANGUAGE("외국어"),
    ROMANCE("연애·사랑");

    private final String description;

    ClubCategory(String description) {
        this.description = description;
    }

}
