package com.example.demo.membership.repository;

import com.example.demo.membership.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MembershipQueryRepository
        extends JpaRepository<Membership, Long>, JpaSpecificationExecutor<Membership> {
}
