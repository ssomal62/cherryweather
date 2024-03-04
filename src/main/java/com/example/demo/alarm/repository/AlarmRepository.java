package com.example.demo.alarm.repository;

import com.example.demo.account.entity.Account;
import com.example.demo.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    List<Alarm> findByAccountOrderByCreatedAtDesc(Account accountId);

    List<Alarm> findByAccountOrTargetIdOrderByCreatedAtDesc(Account accountId, long targetId);

    // 특정 타입에 맞는 targetId를 조회하는 쿼리
    @Query("SELECT a FROM Alarm a WHERE a.account.accountId = :accountId AND a.type = :type ORDER BY a.createdAt DESC")
    List<Alarm> findByAccountIdAndType(@Param("accountId") Long accountId, @Param("type") String type);
}
