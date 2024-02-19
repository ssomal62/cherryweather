package com.example.demo.gpt.service;

import com.example.demo.gpt.dto.GPTRequest;

public interface GPTService {
    String chat(GPTRequest request);
}
