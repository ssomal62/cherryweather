package com.example.demo.notification.controller;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_id")
    private Long accountId; // 사용자 계정

    private boolean weatherNotification; // 날씨 알림
    private boolean clubNotification; // 날씨 알림
    private boolean userInfoNotification; // 날씨 알림

    @Column(name = "club_name")
    private Long clubName; // 클럽 name ( 모임 알림에 사용)

    public Notification() {

    }

    // 생성자
    public Notification(Long accountId, boolean weatherNotification, boolean clubNotification, boolean userInfoNotification, Long clubName) {
        this.accountId = accountId;
        this.weatherNotification = weatherNotification;
        this.clubNotification = clubNotification;
        this.userInfoNotification = userInfoNotification;
        this.clubName = clubName;
    }


    public boolean isWeatherNotification() {
        return weatherNotification;
    }

    public void setWeatherNotification(boolean weatherNotification) {
        this.weatherNotification = weatherNotification;
    }

    public boolean isClubNotification() {
        return clubNotification;
    }

    public void setClubNotification(boolean clubNotification) {
        this.clubNotification = clubNotification;
    }

    public boolean isUserInfoNotification() {
        return userInfoNotification;
    }

    public void setUserInfoNotification(boolean userInfoNotification) {
        this.userInfoNotification = userInfoNotification;
    }
}
