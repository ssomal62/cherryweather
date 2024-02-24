package com.example.demo.gpt.utils;

import com.example.demo.gpt.dto.Message;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

public class MessageUtils {

    public static Message createMessageFromJson(Object json) {
        String jsonString = json.toString();
        JSONObject jsonObject = null;
        try {
            jsonObject = new JSONObject(jsonString);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        String role = null;
        try {
            role = jsonObject.getString("role");
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        String content = null;
        try {
            content = jsonObject.getString("content");
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        return new Message(role, content);
    }
}
