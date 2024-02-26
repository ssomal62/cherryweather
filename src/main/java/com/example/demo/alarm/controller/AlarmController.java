package com.example.demo.alarm.controller;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.alarm.dto.AlarmDto;
import com.example.demo.alarm.service.AlarmServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
public class AlarmController {

    final private AlarmServiceImpl alarmService;

    @PostMapping
    public ResponseEntity<Void> createAlarm(
            @RequestBody AlarmDto alarmDto,
            @AuthenticationPrincipal AccountDetails accountDetails
    ) {
        alarmService.createAlarm(alarmDto, accountDetails);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<AlarmDto> findAlarmDtoList(@AuthenticationPrincipal AccountDetails accountDetails) {
        return alarmService.findAlarmListByAccountId(accountDetails);
    }
}
