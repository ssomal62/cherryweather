package com.example.demo.account.repository;

import com.example.demo.account.entity.Account;
import com.example.demo.account.entity.ActivitiesArea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivitiesAreaRepository extends JpaRepository<ActivitiesArea, Long> {

    void deleteByAccount(Account account);

}
