package com.example.demo.chat.controller;


import com.example.demo.chat.dto.ChatListDto;
import com.example.demo.chat.entity.Chat;
import com.example.demo.chat.service.ChatService;
import com.example.demo.common.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
@CrossOrigin
public class ChatController {
    private final ChatService chatService;
    private final FileService fileService;
    // 채팅방 목록 데이터 전체 조회
    @GetMapping("/getchatlist")
    public List<ChatListDto> getChatList(@RequestParam long accountId) {
        return chatService.getChatList(accountId);
    }
    // chatRoom(채팅방 주소) 조회
   @GetMapping("/getchatinfo")
    public String getChatIdByAccountId(@RequestParam int accountId) {
        return chatService.getChatIdByAccountId(accountId);
    }
    // 클럽 채팅방 정보 조회
   @GetMapping("/getclubchatinfo")
   public String getChatInfo(@RequestParam int accountId, @RequestParam int clubId) {
       System.out.println("accountId:" + accountId);
       System.out.println("clubId:" + clubId);
       return chatService.getChatInfo(accountId, clubId);
   }
    // 1:1 혹은 관리자 채팅방 정보 조회
    @GetMapping("/getonetonechat")
    public Chat getOneToOneChatInfo(@RequestParam int accountId, @RequestParam int raccountId) {
        return chatService.getOneToOneChatInfo(accountId, raccountId);
    }


    // clubId로 채팅방을 찾는 메소드 정의
    @GetMapping("/getchatroombyclubid")
    public List<String> getChatRoomByClubId(@RequestParam int clubId) {
        return Collections.singletonList(chatService.getChatInfoByClubId(clubId));
    }


    // 채팅방 생성
    @PostMapping("/insertclubchatroom")
    public void insertClubChat(@RequestParam int accountId, @RequestParam String chatRoom, @RequestParam int clubId, @RequestParam String chatName) {
        chatService.insertClubChatRoom(accountId, chatRoom, clubId, chatName);
    }

    @PostMapping("/createchatroom")
    public void insertChatRoom(@RequestParam int accountId, @RequestParam String chatRoom, @RequestParam int raccountId, String chatName) {
        chatService.insertChatRoom(accountId, chatRoom, raccountId, chatName);
    }

    // 채팅방 삭제
    @DeleteMapping("/deletechatroom")
    public void deleteChatRoom(@RequestParam int chatId, @RequestParam String chatRoom) {
        chatService.deleteChatRoom(chatId, chatRoom);
    }

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> chatImage(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "chatRoom") String chatRoom) {
        fileService.uploadSingleFile(file,"chat/" + chatRoom);
        return ResponseEntity.ok().build();
    }

}

