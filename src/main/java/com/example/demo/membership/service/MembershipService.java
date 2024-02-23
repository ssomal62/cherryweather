package com.example.demo.membership.service;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.account.entity.Account;
import com.example.demo.account.service.AccountService;
import com.example.demo.club.entity.Club;
import com.example.demo.club.service.ClubService;
import com.example.demo.common.exception.DuplicatedException;
import com.example.demo.common.exception.NotFoundException;
import com.example.demo.membership.dto.ClubSignupDTO;
import com.example.demo.membership.dto.MembershipInfo;
import com.example.demo.membership.dto.MembershipListDTO;
import com.example.demo.membership.dto.UpdateMembership;
import com.example.demo.membership.entity.Membership;
import com.example.demo.membership.enums.ClubRole;
import com.example.demo.membership.repository.MembershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.example.demo.common.exception.enums.ExceptionStatus.*;
import static com.example.demo.membership.enums.RegisteredStatus.ACTIVE;
import static com.example.demo.membership.enums.RegisteredStatus.PENDING;

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
        clubService.increaseCurrentMembers(requestDTO.clubId());
    }

    @Transactional
    public void updateMembership(AccountDetails accountDetails, UpdateMembership requestDTO) {
        Membership existingMembership  = findMembership(requestDTO.clubId(),accountDetails.getAccount().getEmail());
        existingMembership.updateMembership(requestDTO);
        membershipRepository.save(existingMembership);
    }

    @Transactional
    public void deleteMembership(AccountDetails accountDetails, long clubId) {
        Membership existingMembership  = findMembership(clubId, accountDetails.getAccount().getEmail());
        membershipRepository.deleteById(existingMembership.getMembershipId());
        clubService.decreaseCurrentMembers(clubId);
    }

    public Membership findMembership(long clubId, String email) {
        Club findClub = clubService.findClubById(clubId);
        Account findAccount = accountService.findAccountByEmail(email);

        checkAccountThrowNotFoundException(findAccount);

        return membershipRepository.findByClubAndAccount(findClub, findAccount)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBERSHIP));
    }

    public MembershipInfo findMembership(long clubId, AccountDetails accountDetails) {
        Club findClub = clubService.findClubById(clubId);
        Account findAaccount = accountDetails.getAccount();

        return MembershipInfo.builder()
                .info(membershipRepository.findByClubAndAccount(findClub, findAaccount)
                        .orElseThrow(() -> new NotFoundException(NOT_FOUND_MEMBERSHIP)))
                .build();
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
                .status(requestDTO.role() == ClubRole.WAITING ? PENDING : ACTIVE)
                .role(isFirstMember(findClub) ? ClubRole.HOST : requestDTO.role())
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
