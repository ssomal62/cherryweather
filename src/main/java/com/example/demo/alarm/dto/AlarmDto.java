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
    String name;
    Long targetId;
    String type;
    Integer importance;
    LocalDateTime createdAt;
    String description;
    boolean isShowAlarm;

    public static List<AlarmDto> toDtoList(List<Alarm> alarmList) {
        return alarmList.stream().map(alarm ->
                AlarmDto.builder()
                .alarmId(alarm.getAlarmId())
                .name(alarm.getAccount().getName())
                .description(alarm.getDescription())
                .type(alarm.getType())
                .targetId(alarm.getTargetId())
                .importance(alarm.getImportance())
                .createdAt(alarm.getCreatedAt())
                .isShowAlarm(alarm.isShowAlarm())
                .build()
        ).toList();
    }
}
