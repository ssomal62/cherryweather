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

    
    // 클럽 id

    // 계정 id

    // 본인 사진

    // 본인 닉네임

    // 상대방 사진

    // 상대방 닉네임

    // 그룹 채팅 인원



//    private int cunum;
//    private String chatid;
//    private String uphoto;
//    private String unickname;
//    private String cuphoto;
//    private String cunickname;



}
