package com.example.demo.club.event;

import com.example.demo.account.dto.AccountDetails;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ClubGrowthEvent extends ApplicationEvent {

    private final Long clubId;
    private final boolean isIncrease;
    private final AccountDetails accountDetails;

    public ClubGrowthEvent(Object source, Long clubId, boolean isIncrease, AccountDetails accountDetails) {
        super(source);
        this.clubId = clubId;
        this.isIncrease = isIncrease;
        this.accountDetails = accountDetails;
    }
}
