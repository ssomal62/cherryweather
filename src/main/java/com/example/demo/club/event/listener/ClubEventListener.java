package com.example.demo.club.event.listener;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.club.event.ClubCreationEvent;
import com.example.demo.club.event.ClubGrowthEvent;
import com.example.demo.club.service.ClubService;
import com.example.demo.membership.dto.ClubSignupDTO;
import com.example.demo.membership.service.MembershipService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ClubEventListener {

    private final MembershipService membershipService;
    private final ClubService clubService;

    @EventListener
    public void handleCreateClubEvent(ClubCreationEvent event) {
        AccountDetails accountDetails = event.getAccountDetails();
        ClubSignupDTO requestDTO = event.getRequestDTO();

        membershipService.saveMembership(requestDTO, accountDetails);
    }

    @EventListener
    public void handleClubGrowthEvent(ClubGrowthEvent event) {
        if (event.isIncrease()) {
            clubService.increaseGrowthMeter(event.getClubId());
        } else {
            clubService.decreaseGrowthMeter(event.getClubId());
        }
    }
}
