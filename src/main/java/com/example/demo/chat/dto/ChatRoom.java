//package com.example.demo.chat.dto;
//
//import com.example.demo.account.dto.AccountDetails;
//import com.example.demo.account.entity.Account;
//import com.example.demo.club.dto.Club;
//import com.example.demo.chat.entity.Chat;
//import com.example.demo.club.entity.Club;
//import lombok.Getter;
//
//@Getter
//public class ChatDto {
//
//    private int chatId;
//    private Account account;
//    private Account rAccount;
//    private Club club;
//    private String chatRoom;
//
//    public ChatDto(Chat chat) {
//        this.chatId = chat.getChatId();
//        // AccountDto, ClubDto 등의 생성은 필요에 따라 구현해야 합니다.
//        this.account = new Account(chat.getAccountid());
//        this.rAccount = new Account(chat.getRaccountid());
//        this.club = new Club(chat.getClubid());
//        this.chatRoom = chat.getChatRoom();
//    }
//}