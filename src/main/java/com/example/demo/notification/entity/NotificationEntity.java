package com.example.demo.notification.entity;

import jakarta.persistence.*;

@Table(name = "notification_setting")
public class NotificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_id", nullable = false)
    private Long accountId; // 사용자 계정 ID

    @Column(nullable = false)
    private boolean weatherNotification; // 날씨 알림 설정

    @Column(nullable = false)
    private boolean clubNotification; // 클럽 알림 설정

    @Column(nullable = false)
    private boolean userInfoNotification; // 사용자 정보 알림 설정

    @Column(name = "club_name")
    private String clubName; // 클럽 이름

    // 생성자, 게터, 세터, toString 메서드 등 필요한 메서드 추가



}
