package com.example.demo.chat.controller;


import com.example.demo.chat.entity.Chat;
import com.example.demo.chat.service.ChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
//@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    // 채팅방 생성
    @PostMapping("/createchatroom")
    public void createChatRoom(@RequestParam int accountid, @RequestParam String chatRoom, @RequestParam int raccountid) {
        chatService.createChatRoom(accountid, chatRoom, raccountid);
    }
   @GetMapping("/getchatinfo")
    public String getChatIdByAccountId(@RequestParam int accountid) {
        return chatService.getChatIdByAccountId(accountid);
    }

    @PostMapping("/insertchatroom")
    public void insertChatRoom(@RequestParam int accountid, @RequestParam String chatRoom) {
        chatService.insertChatRoom(accountid, chatRoom);
    }

    @GetMapping("/getchatlist")
    public List<Chat> getChatListByAccountId(@RequestParam int accountid) {
        return chatService.getChatListByAccountId(accountid);
    }
}