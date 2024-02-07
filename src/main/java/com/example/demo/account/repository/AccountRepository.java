package com.example.demo.account.repository;

import com.example.demo.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface AccountRepository extends JpaRepository<Account, Long> {

    // ## 이메일로 회원 조회 ## //
    Optional<Account> findByEmail(String email);

}