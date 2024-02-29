package com.example.demo.web_push.controller;

import com.example.demo.web_push.entity.WebPushToken;
import com.example.demo.web_push.repository.WebPushTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebPushTokenController {

    @Autowired
    private WebPushTokenRepository repository;

    @PostMapping("/api/web-push/tokens")
    public WebPushToken saveToken(@RequestBody WebPushToken token) {
        return repository.save(token);
    }

}
