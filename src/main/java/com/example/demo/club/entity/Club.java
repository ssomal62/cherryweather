package com.example.demo.club.entity;


import com.example.demo.club.dto.UpdateClubDTO;
import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubGrade;
import com.example.demo.club.enums.ClubStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;


@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Table(name = "CLUB")
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
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

    @Column(length = 200)
    private String description;

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

    public void updateClub(UpdateClubDTO requestDTO) {
        this.name = requestDTO.name();
        this.description = requestDTO.description();
        this.category = requestDTO.category();
        this.status = requestDTO.status();
        this.activitiesArea = requestDTO.activitiesArea();
        this.updatedUserId = requestDTO.updatedUserId();
        this.representativeUserId = requestDTO.representativeUserId();
    }
}
