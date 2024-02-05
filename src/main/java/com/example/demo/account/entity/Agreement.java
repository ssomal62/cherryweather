package com.example.demo.account.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "AGREEMENT")
public class Agreement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AGREEMENT_ID")
    private Long agreementId;

    @Column(name = "ACCOUNT_ID", nullable = false)
    private Long accountId;

    @Column(name = "AGREEMENT_USE_TERMS", nullable = false, columnDefinition = "BOOLEAN DEFAULT true")
    private boolean agreementUseTerms = true;

    @Column(name = "AGREEMENT_INFO_OFFER", nullable = false)
    private boolean agreementInfoOffer = true;

    @Column(name = "AGREEMENT_GET_NOTIFIED", nullable = false)
    private boolean agreementGetNotified;


    public Agreement() {
    }

    public Agreement(Long accountId, boolean agreementUseTerms, boolean agreementInfoOffer, boolean agreementGetNotified) {
        this.accountId = accountId;
        this.agreementUseTerms = agreementUseTerms;
        this.agreementInfoOffer = agreementInfoOffer;
        this.agreementGetNotified = agreementGetNotified;
    }
}
