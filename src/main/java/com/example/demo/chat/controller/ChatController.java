//package com.example.demo.chat.controller;
//
//import com.example.demo.account.entity.Account;
//import com.example.demo.chat.service.ChatService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Optional;
//
//@Slf4j
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/apichat")
//public class ChatController {
//    private final ChatService chatService;
//
//    @GetMapping("/getuserinfo")
//    public Account getUserInfo(@RequestParam Optional<Integer> accountIdOptional) {
//        int accountId = accountIdOptional.orElseThrow(() -> new IllegalArgumentException("accountId is required"));
//        return chatService.selectChatingRoom(accountId);
//    }
//}
