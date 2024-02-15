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

import static com.example.demo.common.exception.enums.ExceptionStatus.*;
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
    public void saveMembership(ClubSignupDTO requestDTO, AccountDetails accountDetails) {
        Club findClub = clubService.findClubById(requestDTO.clubId());
        Account findAccount = accountDetails.getAccount();

        checkAccountThrowNotFoundException(findAccount);
        checkDuplicateMembership(findClub, findAccount);

        Membership membership = createMembership(requestDTO.screenName(), findClub, findAccount);

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

    //==============  private method  ==============//

    public Membership createMembership(String screenName, Club club, Account account) {
        return Membership.builder()
                .account(account)
                .club(club)
                .screenName(screenName)
                .status(ACTIVE)
                .role(MEMBER)
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
}