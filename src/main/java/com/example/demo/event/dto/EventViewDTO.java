package com.example.demo.event.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class EventViewDTO {

    private Long eventId;
    private Long clubId;
    private Long accountId;
    private String eventRepresentative;
    private String eventSubject;
    private String eventContent;
    private String code;
    private LocalDate eventEndDate;
    private LocalDateTime eventTimeStart;
    private String activitiesArea;
    private Integer eventCountCurrent;
    private Integer eventCapacity;
    private String eventStatus;
    private String eventWeather;
    private Boolean disclosureStatus;
    private Long createdUserId;
    private Long updatedUserId;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}