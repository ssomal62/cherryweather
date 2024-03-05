package com.example.demo.feed.entity;


import com.example.demo.account.dto.AccountDetails;
import com.example.demo.club.dto.UpdateClubDTO;
import com.example.demo.club.entity.Club;
import com.example.demo.feed.dto.FeedUpdateDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Table(name = "feed" )
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Feed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private long feedId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;

    @Column(name ="user_name")
    private String userName;

    @Column(name = "user_profile")
    private String userProfile;

    @Column(name = "content")
    private String content;

    @Column(name ="feed_code")
    private String feedCode;

    @Builder.Default
    @Column(name = "count_liked", nullable = false)
    private String countLiked = "0";

    @Builder.Default
    @Column(name = "liked", nullable = false)
    private boolean liked = false;

    @Column(name ="weather")
    private String weather;

    @Column(name ="is_public")
    private boolean isPublic;

    @CreatedDate
    @Column
    private LocalDateTime createdAt;

    public void updateFeed(FeedUpdateDTO requestDTO) {
            if (content != null) this.content = requestDTO.content();
            this.feedCode = requestDTO.feedCode();
            this.weather = requestDTO.weather();
            this.isPublic = requestDTO.isPublic();
    }

}
