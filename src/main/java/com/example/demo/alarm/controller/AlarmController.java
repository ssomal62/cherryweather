package com.example.demo.alarm.controller;

import com.example.demo.alarm.dto.AlarmDto;
import com.example.demo.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
public class AlarmController {

    private final AlarmService alarmService;


    @GetMapping
    public List<AlarmDto> findAlarmDtoList(@RequestParam Long accountId) {
        return alarmService.findAlarmListByAccountId(accountId);
    }
}
