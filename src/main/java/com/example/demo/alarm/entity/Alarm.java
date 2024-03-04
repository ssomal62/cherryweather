package com.example.demo.alarm.entity;

import com.example.demo.account.entity.Account;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDateTime;

@Entity
@Table(name = "alarm")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@EnableJpaAuditing
@EntityListeners(AuditingEntityListener.class) // JPA Auditing  활성화
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private long alarmId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private Account account;

    @Column
    private Integer importance;

    @Column
    private  Long targetId;

    @Column
    private String type;

    @Column
    private String description;

    @Column
    private Boolean showAlarm; // 수신 동의 필드 추가

    @Column(updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    // showAlarm 필드의 setter
    public void  setShowAlarm(boolean showAlarm) {
        this.showAlarm = showAlarm;
    }

}
