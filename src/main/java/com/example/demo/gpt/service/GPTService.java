package com.example.demo.gpt.service;

import com.example.demo.gpt.dto.GPTRequest;
import reactor.core.publisher.Mono;

public interface GPTService {
    Mono<String> chat(GPTRequest request);
}
