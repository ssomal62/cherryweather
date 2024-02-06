package com.example.demo.account.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
//############ 약관 동의 정보 ############
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "AGREEMENT")
public class Agreement {

    @Id
    @Column(name = "ACCOUNT_ID", nullable = false)
    private Long accountId;

    @Column(name = "AGREEMENT_USE_TERMS", nullable = false, columnDefinition = "BOOLEAN DEFAULT true")
    private boolean agreementUseTerms = true;

    @Column(name = "AGREEMENT_INFO_OFFER", nullable = false)
    private boolean agreementInfoOffer = true;

    @Column(name = "AGREEMENT_GET_NOTIFIED", nullable = false)
    private boolean agreementGetNotified;

    private Timestamp createdAt;

    private Timestamp updatedAt;

}
