package com.example.demo.account.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

//############ 관심사 ############
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
@Table(name = "INTEREST")
public class Interest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "INTEREST_ID", nullable = false)
    private Long interestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID", nullable = false)
    private Account accountId;

    @Column(name = "INTEREST_FIRST", length = 20, nullable = false)
    private String interestFirst;

    @Column(name = "INTEREST_SECOND", length = 20)
    private String interestSecond;

    @Column(name = "INTEREST_THIRD", length = 20)
    private String interestThird;

    @Column(name = "INTEREST_FOURTH", length = 20)
    private String interestFourth;

    @Column(name = "INTEREST_FIFTH", length = 20)
    private String interestFifth;


}
