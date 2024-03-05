package com.example.demo.event.entity;

import com.example.demo.account.entity.Account;
import com.example.demo.club.entity.Club;
import com.example.demo.event.enums.EventStatus;
import com.example.demo.event.enums.Weather;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Table(name = "EVENT")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private long eventId;

    @JoinColumn(name = "clubId")
    @ManyToOne
    private Club clubId;

    @JoinColumn(name = "ACCOUNT_ID")
    @ManyToOne

    private Account accountId;

    @Column(length = 20)
    private long eventRepresentative;

    @Column(nullable = false, length = 100)
    private String eventSubject;

    @Column(length = 200)
    private String eventContent;

    @Column(length = 200)
    private String code;

    @Column
    private LocalDate eventEndDate;

    @Column
    private LocalDateTime eventTimeStart;

    @Column(length = 100)
    private String activitiesArea;

    @Column
    private Integer eventCountCurrent;

    @Column
    private Integer eventCapacity;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EventStatus eventStatus;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Weather eventWeather;

    @Column
    private Boolean disclosureStatus;

    @Column(nullable = false, length = 20)
    private long createdUserId;

    @Column(nullable = false, length = 20)
    private long updatedUserId;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime updatedDate;

    public void updateEvent(String eventSubject, String eventContent, String code, LocalDate eventEndDate, LocalDateTime eventTimeStart, String activitiesArea, EventStatus eventStatus, Weather eventWeather, Boolean disclosureStatus) {
        this.eventSubject = eventSubject;
        this.eventContent = eventContent;
        this.code = code;
        this.eventEndDate = eventEndDate;
        this.eventTimeStart = eventTimeStart;
        this.activitiesArea = activitiesArea;
        this.eventStatus = eventStatus;
        this.eventWeather = eventWeather;
        this.disclosureStatus = disclosureStatus;

    }
    public void incrementEventCountCurrent() {
        this.eventCountCurrent += 1; // 참가자 수 증가
    }


}

