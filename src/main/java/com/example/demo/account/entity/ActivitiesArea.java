package com.example.demo.account.entity;

import com.example.demo.account.enums.ActivityAreaType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

//############ 모임 활동 지역 ############
@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ACTIVITIES_AREA")
public class ActivitiesArea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ACTIVITIES_AREA_ID")
    private Long activitiesAreaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID", nullable = false)
    private Account account;

    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE", nullable = false)
    private ActivityAreaType type;

    @Column(name = "LOCATION", nullable = false)
    private String location;

    // 새로운 생성자 추가
    public ActivitiesArea(Account account, ActivityAreaType type, String location) {
        this.account = account;
        this.type = type;
        this.location = location;
    }
}