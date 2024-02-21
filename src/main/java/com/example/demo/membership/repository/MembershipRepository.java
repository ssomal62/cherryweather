package com.example.demo.membership.repository;

import com.example.demo.account.entity.Account;
import com.example.demo.club.entity.Club;
import com.example.demo.membership.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MembershipRepository extends JpaRepository<Membership, Long> {

    Optional<Membership> findByClubAndAccount(Club clubId, Account accountId);

    boolean existsByClubAndAccount(Club clubId, Account accountId);

    long countByClub(Club clubId);

    List<Membership> findByAccount(Account accountId);
}
