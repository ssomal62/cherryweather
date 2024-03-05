package com.example.demo.event.dto;

import com.example.demo.event.enums.EventStatus;
import com.example.demo.event.enums.Weather;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventDetailListDTO {
    private long clubId;
    private long eventId;
    private String eventSubject;
    private String eventContent;
    private LocalDate eventEndDate;
    private LocalDateTime eventTimeStart;
    private String activitiesArea;
    private String code;
    private Integer eventCountCurrent;
    private Integer eventCapacity;
    private EventStatus eventStatus;
    private Weather eventWeather;
    private Boolean disclosureStatus;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    // 상세 페이지에 필요한 모든 정보를 포함합니다.
    // 필요에 따라 관련된 다른 엔티티의 정보를 포함시킬 수 있습니다.
}