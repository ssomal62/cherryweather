package com.example.demo.chat.entity;

import com.example.demo.account.entity.Account;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Table(name = "chat")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private int chatId;

    


//    private int cunum;
//    private String chatid;
//    private String uphoto;
//    private String unickname;
//    private String cuphoto;
//    private String cunickname;



}
