package com.example.demo.event.dto;

import com.example.demo.event.enums.EventStatus;
import com.example.demo.event.enums.Weather;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventUpdateDTO {
    private long eventId; // 이벤트 ID
    private String eventSubject; // 이벤트 제목
    private String eventContent; // 이벤트 내용
    private String code; // 이벤트 사진
    private LocalDate eventEndDate; // 이벤트 종료일
    private LocalDateTime eventTimeStart; // 이벤트 시작시간
    private String activitiesArea; // 이벤트 장소
    private EventStatus eventStatus; // 이벤트 공개 상태
    private Weather eventWeather; // 이벤트 날씨
    private Boolean disclosureStatus; // 이벤트 공개 여부


}