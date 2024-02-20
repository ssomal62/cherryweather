package com.example.demo.chat.service;

import com.example.demo.chat.entity.Chat;
import com.example.demo.chat.repository.ChatRepository;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final ChatRepository chatRepository;

public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }
    @Transactional
    public String getChatIdByAccountId(int accountid) {
        return chatRepository.getChatIdByAccountId(accountid);
    }

    @Transactional
    public void createChatRoom(int accountid, String chatRoom, int raccountid) {
        chatRepository.createChatRoom(accountid, chatRoom, raccountid);
    }


    public List<Chat> getChatListByAccountId(int accountid) {
        return chatRepository.getChatListByAccountId(accountid);
    }

    // 채팅방을 생성하는 메소드 정의
    @Transactional
    public void insertChatRoom(int accountid, String chatroom) {
        chatRepository.insertChatRoom(accountid, chatroom);
    }



}