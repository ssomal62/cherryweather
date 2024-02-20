package com.example.demo.chat.entity;

import com.example.demo.account.entity.Account;
import com.example.demo.club.entity.Club;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
    // 계정 id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    @JsonBackReference // 순환 참조 방지
    private Account accountid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "raccountid")
    @JsonBackReference // 순환 참조 방지
    private Account raccountid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clubId")
    @JsonBackReference // 순환 참조 방지
    private Club clubid;
    // 채팅방
    @Column
    private String chatRoom;

}
// 본인 사진
//    @Column
//    private String photo;
//    // 본인 닉네임
//    @Column
//    private String nickname;

//    // 상대방 사진
//    @Column
//    private String receiverPhoto;
//    // 상대방 닉네임
//    @Column
//    private String receiverNickname;
//    // 그룹 채팅 인원
//    @Column
//    private int groupChatNum;


//    private int cunum;
//    private String chatid;
//    private String uphoto;
//    private String unickname;
//    private String cuphoto;
//    private String cunickname;