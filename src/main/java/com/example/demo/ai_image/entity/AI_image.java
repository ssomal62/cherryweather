package com.example.demo.ai_image.entity;


import com.example.demo.account.entity.Account;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Table(name = "AI_IMAGE")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AI_image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, name = "AI_IMAGE_ID")
    private long aiImageId;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID", referencedColumnName = "ACCOUNT_ID")
    private Account account;

    @Column(name = "PROMPT", nullable = false, length = 1000)
    private String prompt;

    @Column(name = "IMAGE_URL", nullable = false, length = 1000)
    private String imageURL;

    @Column(name = "CHECK_SAVE", nullable = false)
    private boolean checkSave;

    @Column(name = "CREATED_AT", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreatedDate
    private LocalDateTime createdAt;

    @Builder(toBuilder = true)
    public AI_image(long aiImageId, Account account,String prompt, String imageURL, boolean checkSave, LocalDateTime createdAt) {
        this.aiImageId = aiImageId;
        this.account = account;
        this.prompt = prompt;
        this.imageURL = imageURL;
        this.checkSave = checkSave;
        this.createdAt = createdAt;
    }
}
