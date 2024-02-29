package com.example.demo.gpt.service;

import com.example.demo.gpt.dto.ChatRequest;
import com.example.demo.gpt.dto.GPTRequest;
import reactor.core.publisher.Mono;

public interface GPTService {
    Mono<String> chat(ChatRequest request);

    void startNewChatSession();
}
