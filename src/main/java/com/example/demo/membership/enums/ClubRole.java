package com.example.demo.membership.enums;

import lombok.Getter;


@Getter
public enum ClubRole {

    HOST("대표 멤버"),
    MODERATOR("운영 멤버"),
    MEMBER("일반 멤버"),
    WAITING("대기 멤버");

    private final String description;

    ClubRole(String description) {
        this.description = description;
    }
}