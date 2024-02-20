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

   

   @GetMapping("/getchatinfo")
    public String getChatIdByAccountId(@RequestParam int accountid) {
        return chatService.getChatIdByAccountId(accountid);
    }
    // 채팅방 생성
    @PostMapping("/insertchatroom")
    public void insertChatRoom(@RequestParam int accountid, @RequestParam String chatRoom) {
        chatService.insertChatRoom(accountid, chatRoom);
    }

    @PostMapping("/insertclubchatroom")
    public void insertClubChatRoom(@RequestParam int accountid, @RequestParam String chatRoom, @RequestParam int clubid) {
        chatService.insertClubChatRoom(accountid, chatRoom, clubid);
    }
    @PostMapping("/insertpersonalchatroom")
    public void insertPesonalChatRoom(@RequestParam int accountid, @RequestParam int chatRoom, @RequestParam int raccountid) {
        chatService.insertPesonalChatRoom(accountid, chatRoom, raccountid);
    }
    @GetMapping("/getchatlist")
    public List<Chat> getChatListByAccountId(@RequestParam int accountid) {
        return chatService.getChatListByAccountId(accountid);
    }


}