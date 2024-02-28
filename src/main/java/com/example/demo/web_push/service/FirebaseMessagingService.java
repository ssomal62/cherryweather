package com.example.demo.web_push.service;

import com.example.demo.gpt.dto.Message;
import com.example.demo.web_push.entity.WebPushToken;
import com.example.demo.web_push.repository.WebPushTokenRepository;
import com.google.api.services.storage.model.Notification;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.WebpushConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class FirebaseMessagingService {

    @Autowired
    private WebPushTokenRepository tokenRepository;

    @PostConstruct
    public void initialize() {
        try {
            InputStream serviceAccount = getClass().getResourceAsStream("/webPush/serviceAccountKey.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (IOException e) {
            throw new RuntimeException("Firebase 서비스 계정 키를 초기화하는데 실패했습니다.", e);
        }
    }

//    @Scheduled(cron = "0 0 9 * * ?") // 매일 오전 9시에 실행
//    public void sendScheduledNotification() {
//        List<WebPushToken> tokens = tokenRepository.findAll();
//
//        // Notification 객체 생성
//        Notification notification = Notification.builder()
//                .setTitle("오늘의 날씨")
//                .setBody("맑음, 최고 기온 25°C")
//                .build();
//
//        tokens.forEach(token -> {
//            // Message 객체 생성 시 Notification 객체를 직접 사용
//            Message message = Message.builder()
//                    .setNotification(notification)
//                    .setToken(token.getToken())
//                    .build();
//
//            try {
//                String response = FirebaseMessaging.getInstance().send(message);
//                System.out.println("Scheduled Notification sent successfully: " + response);
//            } catch (FirebaseMessagingException e) {
//                System.err.println("Failed to send scheduled notification: " + e.getMessage());
//            }
//        });
//    }
}
