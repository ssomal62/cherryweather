package com.example.demo.alarm.controller;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.account.service.AccountService;
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
        return alarmService.findByTargetIdOrderByCreatedAtDesc(accountDetails);
    }

    // 사용자 알림 수신 동의 업데이트 하는 부분
    @PostMapping("/alarm-agreement")
    public ResponseEntity<Void> updateAlarmAgreement(
            @PathVariable Long id, @RequestBody Boolean isShowAlarm
    ) {
        alarmService.updateAlarmVisibility(id, isShowAlarm); // 이 부분에서 accountService 사용
        return ResponseEntity.ok().build();
    }

    // 알람 목록 delete 하면 삭제
    @DeleteMapping("/{alarmId}")
    public ResponseEntity<Void> deleteAlarm(@PathVariable(value = "alarmId") Long alarmId) {

        System.out.println("딜리트값 확인" + alarmId);
        alarmService.deleteAlarm(alarmId);
        return ResponseEntity.ok().build();
    }
}
