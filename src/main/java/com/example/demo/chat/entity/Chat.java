package com.example.demo.chat.entity;

import com.example.demo.account.entity.Account;
import com.example.demo.club.entity.Club;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Data
@Table(name = "chat")
@NoArgsConstructor
@AllArgsConstructor
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private long chatId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "accountId")
    private Account account;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "clubId")
    private Club club;

    @Column
    private Long raccountId;

    // 채팅방
    @Column
    private String chatRoom;

    @Column
    private String chatName;

    public Long getAccountId() {
        return account.getAccountId();
    }
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