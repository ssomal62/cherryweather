package com.example.demo.event_membership.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class EventSignupDTO {
    private long eventId;
    private long accountId;
}
