package com.example.demo.alarm.service;

import com.example.demo.account.entity.Account;
import com.example.demo.account.repository.AccountRepository;
import com.example.demo.account.service.AccountService;
import com.example.demo.alarm.dto.AlarmDto;
import com.example.demo.alarm.entity.Alarm;
import com.example.demo.alarm.repository.AlarmRepository;
import com.example.demo.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Description;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.demo.common.exception.enums.ExceptionStatus.NOT_FOUND_ACCOUNT;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {

    private final AlarmRepository alarmRepository;
    private final AccountRepository accountRepository;


    // 알람 정보 db 넣기
    @Transactional
    @Override
    public void createAlarm(AlarmDto alarmDto) {

        Alarm alarm = Alarm.builder()
                .account(alarmDto.getAccount())
                .description(alarmDto.getDescription())
                .build();

        alarmRepository.save(alarm);

    }
    // 알람 list 받아오기
    @Override
    @Transactional(readOnly = true)
    public List<AlarmDto> findAlarmListByAccountId(Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_ACCOUNT));

        List<Alarm> alarmList = alarmRepository.findByAccount(account);

        for (Alarm alarm : alarmList) {
            log.info(alarm.getDescription(), alarm.getAlarmId());
        }
//        return null;
//        List<AlarmDto> alarmDtoList = toDtoList(alarmList);
        List<AlarmDto> alarmDtoList = new ArrayList<>();


        for (Alarm alarm: alarmList) {
            log.info(alarm.getDescription(), alarm.getAlarmId());
            alarmDtoList.add(AlarmDto.builder()
                    .alarmId(alarm.getAlarmId())
                    .name(alarm.getAccount().getName())
                    .createdAt(alarm.getCreatedAt())
                    .description(alarm.getDescription()).build());
        }
        return alarmDtoList;
    }

//    public List<AlarmDto> toDtoList(List<Alarm> alarmList) {
//        log.info("=------------------------");
//        return alarmList.stream().map(alarm -> AlarmDto.builder()
//                .alarmId(alarm.getAlarmId())
//                .account(alarm.getAccount())
//                .name("김요")
//                .createdAt(alarm.getCreatedAt())
//                .build()
//        ).collect(Collectors.toList());
//    }






}
