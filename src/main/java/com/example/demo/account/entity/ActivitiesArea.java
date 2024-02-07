package com.example.demo.account.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

//############ 모임 활동 지역 ############
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ACTIVITIES_AREA")
public class ActivitiesArea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ACTIVITIES_AREA_ID", nullable = false)
    private Long activitiesAreaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID", nullable = false)
    private Account accountId;

    @Column(name = "ACTIVITIES_AREA_FIRST", nullable = false)
    private String activitiesAreaFirst;

    @Column(name = "ACTIVITIES_AREA_SECOND")
    private String activitiesAreaSecond;

    @Column(name = "ACTIVITIES_AREA_THIRD")
    private String activitiesAreaThird;

}
