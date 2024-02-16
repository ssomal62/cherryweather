package com.example.demo.gpt.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class GPTRequest {

    private String model;
    private List<Message> messages;
    private int temperature;
    private int max_tokens;
    private int top_p;
    private int frequency_penalty;
    private int presence_penalty;

    @Override
    public String toString() {
        return super.toString();
    }

    public GPTRequest(String model
            , String prompt
            , int temperature
            , int max_tokens
            , int top_p
            , int frequency_penalty
            , int presence_penalty) {
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.add(new Message("user",prompt));
        this.temperature = temperature;
        this.max_tokens = max_tokens;
        this.top_p =top_p;
        this.frequency_penalty =frequency_penalty;
        this.presence_penalty = presence_penalty;

    }
}