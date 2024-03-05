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
                .targetId(alarmDto.getTargetId())
                .targetTypeId(alarmDto.getTargetTypeId())
                .importance(alarmDto.getImportance())
                .description(alarmDto.getDescription())
                .build();
        alarmRepository.save(alarm);
    }

    // 알람 list 받아오기
    @Transactional
    public List<AlarmDto> findAlarmListByAccountId(AccountDetails accountDetails) {
        List<Alarm> alarmList = alarmRepository.findByTargetIdOrderByCreatedAtDesc(accountDetails.getAccount().getAccountId());
        return AlarmDto.toDtoList(alarmList);
    }

    @Transactional
    public void updateAlarmVisibility(Long alarmId, boolean isShowAlarm) {
        Alarm alarm = alarmRepository.findById(alarmId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid alarm ID"));
        alarm.setShowAlarm(isShowAlarm);
        alarmRepository.save(alarm);
    }

    @Transactional
    // 특정 accountId와 type에 해당하는 알람 목록 조회
    public List<AlarmDto> findAlarmListByAccountIdAndType(Long accountId, String type) {
        List<Alarm> alarmList = alarmRepository.findByAccountIdAndType(accountId, type);
        return AlarmDto.toDtoList(alarmList);
    }

    @Transactional
    public void deleteAlarm(long alarmId) {
        alarmRepository.deleteById(alarmId);
    }

}

