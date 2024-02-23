package com.example.demo.alarm.service;

import com.example.demo.account.entity.Account;
import com.example.demo.alarm.dto.AlarmDto;

import java.util.List;

public interface AlarmService {

    void createAlarm (final AlarmDto alarmDto);

    List<AlarmDto> findAlarmListByAccountId(final Long accountId);

}
