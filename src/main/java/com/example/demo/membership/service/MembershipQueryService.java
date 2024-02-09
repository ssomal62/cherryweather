package com.example.demo.membership.service;

import com.example.demo.account.entity.Account;
import com.example.demo.account.service.AccountService;
import com.example.demo.club.entity.Club;
import com.example.demo.club.service.ClubService;
import com.example.demo.membership.dto.MembershipListDTO;
import com.example.demo.membership.dto.MembershipQueryDTO;
import com.example.demo.membership.entity.Membership;
import com.example.demo.membership.repository.MembershipQueryRepository;
import com.example.demo.membership.repository.spec.MembershipSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MembershipQueryService {

    private final MembershipQueryRepository membershipQueryRepository;
    private final ClubService clubService;
    private final AccountService accountService;

    @Transactional
    public MembershipListDTO findAllByConditions(MembershipQueryDTO requestDTO) {

        Specification<Membership> spec = Specification.where(null);

        if(requestDTO.email() != null) {
            Account findAccount = accountService.findAccountByEmail(requestDTO.email());
            spec = buildSpecificationForAccount(findAccount, spec);
        }
        if(requestDTO.clubId() != null) {
            Club findClub = clubService.findClubById(requestDTO.clubId());
            spec = buildSpecificationForClub(findClub, spec);
        }

        List<Membership> membershipList = membershipQueryRepository.findAll(spec);
        return MembershipListDTO.fromMembership(membershipList);
    }

    //==============  private method  ==============//

    private Specification<Membership> buildSpecificationForAccount(Account account, Specification<Membership> spec) {
        return Optional.ofNullable(account)
                .map(MembershipSpecification::equalAccount)
                .map(spec::and)
                .orElse(spec);
    }

    private Specification<Membership> buildSpecificationForClub(Club club, Specification<Membership> spec) {
        return Optional.ofNullable(club)
                .map(MembershipSpecification::equalClub)
                .map(spec::and)
                .orElse(spec);
    }
}