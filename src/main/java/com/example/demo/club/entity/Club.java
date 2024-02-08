package com.example.demo.club.entity;


import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubGrade;
import com.example.demo.club.enums.ClubStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;


@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Table(name = "CLUB")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private long clubId;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(length = 20)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ClubGrade grade;

    @Column
    private Integer maxGrowthMeter;

    @Column
    private Integer currentGrowthMeter;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private ClubCategory category;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ClubStatus status;

    @Column(nullable = true)
    private Long representativeUserId;

    @Column
    private Integer currentMembers;

    @Column
    private Integer maxMembers;

    @Column
    private String activitiesArea;

    @Column(nullable = true)
    private Long createdUserId;

    @Column(nullable = true)
    private Long updatedUserId;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Builder(toBuilder = true)
    public Club(long clubId, String name, String code, ClubGrade grade, Integer maxGrowthMeter, Integer currentGrowthMeter, ClubCategory category, ClubStatus status, Long representativeUserId, Integer currentMembers, Integer maxMembers, String activitiesArea, Long createdUserId, Long updatedUserId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.clubId = clubId;
        this.name = name;
        this.code = code;
        this.grade = grade;
        this.maxGrowthMeter = maxGrowthMeter;
        this.currentGrowthMeter = currentGrowthMeter;
        this.category = category;
        this.status = status;
        this.representativeUserId = representativeUserId;
        this.currentMembers = currentMembers;
        this.maxMembers = maxMembers;
        this.activitiesArea = activitiesArea;
        this.createdUserId = createdUserId;
        this.updatedUserId = updatedUserId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
