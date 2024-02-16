package com.example.demo.gpt.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GPTRequest {

    private String model;
    private List<Message> messages;
    private int temperature;
    private int max_tokens;
    private int top_p;
    private int frequency_penalty;
    private int presence_penalty;

    @Builder
    public GPTRequest(String model, List<Message> messages, int temperature, int max_tokens, int top_p, int frequency_penalty, int presence_penalty) {
        this.model = model;
        this.messages = messages;
        this.temperature = temperature;
        this.max_tokens = max_tokens;
        this.top_p = top_p;
        this.frequency_penalty = frequency_penalty;
        this.presence_penalty = presence_penalty;
    }
}