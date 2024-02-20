package com.example.demo.chat.repository;

import com.example.demo.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ChatRepository extends JpaRepository<Chat, Integer> {

    // account_id로 채팅방을 찾는 메소드 정의
    @Query(value = "SELECT chat_room FROM chat WHERE account_id = ?1" , nativeQuery = true)
    String getChatIdByAccountId(int accountid);

    // chatroom이 없으면 채팅방을 생성하는 메소드 정의
    @Query(value = "INSERT INTO chat (accountid, chat_room, raccountid) VALUES (?1, ?2, ?3)", nativeQuery = true)
    void createChatRoom(int accountid, String chatroom, int receiverNum);

    @Query(value = "SELECT * FROM chat WHERE account_id = ?1", nativeQuery = true)
    List<Chat> getChatListByAccountId(int accountid);

    // 채팅방을 생성하는 메소드 정의
    @Modifying
    @Query(value = "INSERT INTO chat (account_id, chat_room) VALUES (?1, ?2)", nativeQuery = true)
    void insertChatRoom(int accountid, String chatroom);


}