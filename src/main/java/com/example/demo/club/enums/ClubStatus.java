package com.example.demo.club.enums;

import lombok.Getter;

@Getter
public enum ClubStatus {

    PUBLIC("공개"),
    PRIVATE("비공개"),
    MEMBERS_ONLY("멤버 공개");

    private final String description;


    ClubStatus(String description) {
        this.description = description;
    }

}
