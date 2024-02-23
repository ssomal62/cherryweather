package com.example.demo.notification.service;

import com.example.demo.notification.NotificationRepository;
import com.example.demo.notification.entity.NotificationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository; // 여기를 수정했어요!

    public void sendWeatherNotifications() {
        List<NotificationEntity> settings = notificationRepository.findAllByWeatherNotificationTrue();
        // 날씨 알림 로직
    }

    public void sendClubNotifications(String clubName) {
        List<NotificationEntity> settings = notificationRepository.findAllByClubNameAndClubNotificationTrue(clubName);
        // 클럽 모임 알림 로직
    }

//    public void sendUserInfoNotifications(Long accountId) {
//        NotificationEntity setting = notificationRepository.findByAccountId(accountId);
//        if (setting != null && setting.isUserInfoNotification()) {
//            // 사용자 정보 알림 로직
//        }
//    }
}


