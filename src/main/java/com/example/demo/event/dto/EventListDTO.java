package com.example.demo.event.dto;

import com.example.demo.event.enums.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EventListDTO {
    private long clubId;
    private long eventId;
    private String eventSubject;
    private LocalDate eventEndDate;
    private Integer eventCapacity;
    private EventStatus eventStatus;
}
// 리스트 출력에 필요한 기본적인 정보들을 포함합니다.
// 필요에 따라 추가적인 정보를 포함시