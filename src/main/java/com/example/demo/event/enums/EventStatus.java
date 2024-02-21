package com.example.demo.event.enums;

import lombok.Getter;

@Getter
public enum EventStatus {

        PUBLIC("공개"),
        PRIVATE("비공개"),
        MEMBERS_ONLY("멤버 공개");

        private final String description;


    EventStatus(String description) {
            this.description = description;
        }

    }

