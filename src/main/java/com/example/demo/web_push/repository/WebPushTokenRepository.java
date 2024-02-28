package com.example.demo.web_push.repository;

import com.example.demo.web_push.entity.WebPushToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WebPushTokenRepository extends JpaRepository <WebPushToken, Long>{
}
