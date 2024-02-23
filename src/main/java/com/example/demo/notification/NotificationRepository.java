package com.example.demo.notification;

import com.example.demo.notification.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findAllByWeatherNotificationTrue();
    List<NotificationEntity> findAllByClubNameAndClubNotificationTrue(String clubName);
    NotificationEntity findByAccountId(Long accountId);
}
