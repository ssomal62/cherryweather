package com.example.demo.alarm.dto;


import com.example.demo.alarm.entity.Alarm;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
public class AlarmDto {

    Long alarmId;
    Long targetId;
    String type;
    Integer importance;
    LocalDateTime createdAt;
    String description;

    public static List<AlarmDto> toDtoList(List<Alarm> alarmList) {
        return alarmList.stream().map(alarm ->
                AlarmDto.builder()
                .alarmId(alarm.getAlarmId())
                .description(alarm.getDescription())
                .type(alarm.getType())
                .targetId(alarm.getTargetId())
                .importance(alarm.getImportance())
                .createdAt(alarm.getCreatedAt())
                .build()
        ).toList();
    }
}
