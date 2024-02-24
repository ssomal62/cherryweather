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
    private Account account;

    @Column(name = "INTEREST_NAME", length = 50, nullable = false)
    private String interestName;

    // 새로운 생성자 추가
    public Interest(Account account, String interestName) {
        this.account = account;
        this.interestName = interestName;
    }

}
