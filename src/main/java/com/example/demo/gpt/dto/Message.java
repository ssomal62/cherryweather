package com.example.demo.gpt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {

    private String role;
    private String content;
}