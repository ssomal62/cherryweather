package com.example.demo.alarm.repository;

import com.example.demo.account.entity.Account;
import com.example.demo.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    List<Alarm> findByAccountOrderByCreatedAtDesc(Account account);
}
