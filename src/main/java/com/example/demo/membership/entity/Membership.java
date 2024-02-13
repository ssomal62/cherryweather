package com.example.demo.membership.entity;


import com.example.demo.account.entity.Account;
import com.example.demo.club.entity.Club;
import com.example.demo.membership.dto.UpdateMembership;
import com.example.demo.membership.enums.ClubRole;
import com.example.demo.membership.enums.RegisteredStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Table(
        name = "membership",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "club_id"})
        }
)
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private long membershipId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;

    @Column
    private String screenName;

    @Column
    @Enumerated(EnumType.STRING)
    private ClubRole role;

    @Column
    @Enumerated(EnumType.STRING)
    private RegisteredStatus status;

    @Column
    private Long updatedUserId;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    //TODO : 클럽별로 사진 별도 등록하게할지?

    public void updateMembership(UpdateMembership requestDTO) {
        this.screenName = requestDTO.screenName();
        this.status = requestDTO.status();
        this.role = requestDTO.role();
        this.updatedUserId = requestDTO.updatedUserId();
    }
}