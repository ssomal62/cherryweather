package com.example.demo.club.event;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.membership.dto.ClubSignupDTO;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ClubCreationEvent extends ApplicationEvent {

    private final AccountDetails accountDetails;
    private final ClubSignupDTO requestDTO;

    public ClubCreationEvent(
            Object source,
            AccountDetails accountDetails,
            ClubSignupDTO requestDTO
    ) {
        super(source);
        this.accountDetails = accountDetails;
        this.requestDTO = requestDTO;
    }
}
