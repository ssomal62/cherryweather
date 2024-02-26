package com.example.demo.alarm.entity;

import com.example.demo.account.entity.Account;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "alarm", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id"})
})
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
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

    @CreatedDate
    private LocalDateTime createdAt;

}
