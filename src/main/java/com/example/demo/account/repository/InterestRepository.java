package com.example.demo.account.repository;

import com.example.demo.account.entity.Account;
import com.example.demo.account.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterestRepository extends JpaRepository<Interest, Long> {

    void deleteByAccount(Account account);

}
