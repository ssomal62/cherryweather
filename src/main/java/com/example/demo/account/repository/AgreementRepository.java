package com.example.demo.account.repository;

import com.example.demo.account.entity.Agreement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AgreementRepository extends JpaRepository<Agreement, Long> {
    Optional<Agreement> findByAccountId(Long accountId);
}