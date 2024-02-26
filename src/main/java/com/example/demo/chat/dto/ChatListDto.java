package com.example.demo.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatListDto {

    private Long chatId;
    private Long accountId;
    private Long clubId;
    private String chatRoom;
    private Long raccountId;
    private String chatName;

}