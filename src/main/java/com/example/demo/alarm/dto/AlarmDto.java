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
    Account account;
    LocalDateTime createdAt;
    String description;

    public List<AlarmDto> toDtoList(List<Alarm> alarmList) {
        return alarmList.stream().map(alarm -> AlarmDto.builder()
                .alarmId(alarm.getAlarmId())
                .account(alarm.getAccount())
                .name(alarm.getAccount().getName())
                .createdAt(alarm.getCreatedAt())
                .build()
        ).collect(Collectors.toList());
    }
}
