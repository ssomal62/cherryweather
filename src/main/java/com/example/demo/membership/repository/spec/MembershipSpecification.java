package com.example.demo.membership.repository.spec;

import com.example.demo.account.entity.Account;
import com.example.demo.club.entity.Club;
import com.example.demo.membership.entity.Membership;
import org.springframework.data.jpa.domain.Specification;

public class MembershipSpecification {

    private MembershipSpecification() {
        throw new IllegalStateException("Utility class");
    }

    public static Specification<Membership> equalClub(Club club) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("club"),club);
    }

    public static Specification<Membership> equalAccount(Account account) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("account"), account);
    }
}