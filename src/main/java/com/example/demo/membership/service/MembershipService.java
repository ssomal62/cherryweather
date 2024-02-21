package com.example.demo.membership.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.account.entity.Account;
import com.example.demo.account.service.AccountService;
import com.example.demo.club.entity.Club;
import com.example.demo.club.service.ClubService;
import com.example.demo.common.exception.DuplicatedException;
import com.example.demo.common.exception.NotFoundException;
import com.example.demo.membership.dto.ClubSignupDTO;
import com.example.demo.membership.dto.MembershipListDTO;
import com.example.demo.membership.dto.UpdateMembership;
import com.example.demo.membership.entity.Membership;
import com.example.demo.membership.repository.MembershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.example.demo.common.exception.enums.ExceptionStatus.*;
import static com.example.demo.membership.enums.ClubRole.HOST;
import static com.example.demo.membership.enums.ClubRole.MEMBER;
import static com.example.demo.membership.enums.RegisteredStatus.ACTIVE;

@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final ClubService clubService;
    private final AccountService accountService;

    @Transactional
    public MembershipListDTO findAllMembership() {
        return MembershipListDTO.fromMembership(membershipRepository.findAll());
    }

    @Transactional
    public MembershipListDTO findAllByAccount(AccountDetails accountDetails) {
        List<Membership> findMembership = membershipRepository.findByAccount(accountDetails.getAccount());
        return MembershipListDTO.fromMembership(findMembership);
    }

    @Transactional
    public void saveMembership(ClubSignupDTO requestDTO, AccountDetails accountDetails) {
        Membership membership = createMembership(requestDTO, accountDetails);
        membershipRepository.save(membership);
    }

    @Transactional
    public void updateMembership(UpdateMembership requestDTO) {
        Membership existingMembership  = findMembership(requestDTO.clubId(), requestDTO.userEmail());
        existingMembership.updateMembership(requestDTO);
        membershipRepository.save(existingMembership);
    }

    @Transactional
    public void deleteMembership(UpdateMembership requestDTO) {
        Membership existingMembership  = findMembership(requestDTO.clubId(), requestDTO.userEmail());
        membershipRepository.delete(existingMembership);
    }

    public Membership findMembership(long clubId, String email) {
        Club findClub = clubService.findClubById(clubId);
        Account findAccount = accountService.findAccountByEmail(email);

        checkAccountThrowNotFoundException(findAccount);

        return membershipRepository.findByClubAndAccount(findClub, findAccount)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBERSHIP));
    }

    public Boolean checkMember(long clubId, AccountDetails accountDetails) {
        Club findClub = clubService.findClubById(clubId);
        Account findAaccount = accountDetails.getAccount();

        return membershipRepository.existsByClubAndAccount(findClub, findAaccount);
    }

    //==============  private method  ==============//

    private Membership createMembership(ClubSignupDTO requestDTO, AccountDetails accountDetails) {
        Club findClub = clubService.findClubById(requestDTO.clubId());
        Account findAccount = accountDetails.getAccount();

        checkAccountThrowNotFoundException(findAccount);
        checkDuplicateMembership(findClub, findAccount);

        return Membership.builder()
                .account(findAccount)
                .club(findClub)
                .status(ACTIVE)
                .role(isFirstMember(findClub) ? HOST : MEMBER)
                .build();
    }

    private void checkAccountThrowNotFoundException(Account account) {
        if (account == null) {
            throw new NotFoundException(NOT_FOUND_ACCOUNT);
        }
    }

    private void checkDuplicateMembership(Club club, Account account) {
        boolean exists = membershipRepository.existsByClubAndAccount(club, account);
        if (exists) {
            throw new DuplicatedException(CONFLICT_CLUB_MEMBERSHIP);
        }
    }

    private boolean isFirstMember(Club findClub) {
        long memberCount = membershipRepository.countByClub(findClub);
        return memberCount == 0;
    }
}
