package com.example.demo.membership.enums;

import lombok.Getter;

@Getter
public enum RegisteredStatus {

    ACTIVE("활동 중"),
    PENDING("대기 중"),
    INACTIVE("비활성"),
    BANNED("차단됨");

    private final String description;

    RegisteredStatus(String description) {
        this.description = description;
    }
}