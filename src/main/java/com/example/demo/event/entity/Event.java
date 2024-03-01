package com.example.demo.event.entity;

import com.example.demo.club.entity.Club;
import com.example.demo.event.enums.EventStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @Column(length = 20)
    private String eventRepresentative;

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
    private String eventPlace;

//    @Column
//    private Integer eventMembershipFee;

    @Column
    private Integer eventCountCurrent;

    @Column
    private Integer eventCapacity;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EventStatus eventStatus;

//    @Enumerated(EnumType.STRING)
//    @Column(length = 20)
//    private Weather eventWeather;

    @Column
    private Boolean disclosureStatus;

    @Column(nullable = false, length = 20)
    private String createdUserId;

    @Column(nullable = false, length = 20)
    private String updatedUserId;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private LocalDateTime updatedDate;
}

