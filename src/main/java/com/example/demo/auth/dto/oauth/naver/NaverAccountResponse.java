package com.example.demo.auth.dto.oauth.naver;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Value;

@Value
public class NaverAccountResponse {

    @JsonProperty("resultcode")
    String resultCode;

    String message;

    @JsonProperty("response")
    NaverAccount naverAccount;

    @Value
    public static class NaverAccount {

        String id;

        String gender;

        String email;

        @JsonProperty("mobile")
        String phoneNumber;

        String name;


    }

}