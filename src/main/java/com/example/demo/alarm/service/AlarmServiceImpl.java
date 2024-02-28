package com.example.demo.alarm.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.alarm.dto.AlarmDto;
import com.example.demo.alarm.entity.Alarm;
import com.example.demo.alarm.repository.AlarmRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlarmServiceImpl {

    private final AlarmRepository alarmRepository;

    // 알람 정보 db 넣기
    @Transactional
    public void createAlarm(AlarmDto alarmDto, AccountDetails accountDetails) {
        Alarm alarm = Alarm.builder()
                .account(accountDetails.getAccount())
                .type(alarmDto.getType())
                .importance(alarmDto.getImportance())
                .description(alarmDto.getDescription())
                .build();
        alarmRepository.save(alarm);
    }
    // 알람 list 받아오기
    @Transactional
    public List<AlarmDto> findAlarmListByAccountId(AccountDetails accountDetails) {
        List<Alarm> alarmList = alarmRepository.findByAccountOrderByCreatedAtDesc(accountDetails.getAccount());
        return AlarmDto.toDtoList(alarmList);
    }

    }

