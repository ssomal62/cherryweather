package com.example.demo.alarm.dto;


import com.example.demo.account.entity.Account;
import com.example.demo.alarm.entity.Alarm;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
public class AlarmDto {

    Long alarmId;
    String name;
    Long targetId;
    String type;
    Integer importance;
    LocalDateTime createdAt;
    String description;

    public static List<AlarmDto> toDtoList(List<Alarm> alarmList) {
        return alarmList.stream().map(alarm -> AlarmDto.builder()
                .alarmId(alarm.getAlarmId())
                .name(alarm.getAccount().getName())
                .description(alarm.getDescription())
                .createdAt(alarm.getCreatedAt())
                .build()
        ).collect(Collectors.toList());
    }
}
