package com.example.demo.alarm.repository;

import com.example.demo.account.entity.Account;
import com.example.demo.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    @Query("SELECT a FROM Alarm a WHERE a.account = :account ORDER BY a.createdAt DESC")
    List<Alarm> findByAccountOrderByCreatedAtDesc(@Param("account") Account accountId);

}
