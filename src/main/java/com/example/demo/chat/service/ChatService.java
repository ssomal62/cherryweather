package com.example.demo.chat.service;


import com.example.demo.chat.dto.ChatListDto;
import com.example.demo.chat.entity.Chat;
import com.example.demo.chat.repository.ChatRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }
    @Transactional
    public String getChatIdByAccountId(int accountId) {
        return chatRepository.getChatIdByAccountId(accountId);
    }


    @Transactional
    public List<ChatListDto> getChatList(long accountId) {
        // accountId를 기준으로 해당 계정의 채팅 목록을 조회합니다.
        List<Chat> chatList = chatRepository.findByAccountAccountId(accountId);

        // 조회된 채팅 목록을 ChatListDto로 매핑하여 반환합니다.
        return chatList.stream()
                .map(chat -> {
                    Long accountIdFromChat = chat.getAccount() != null ? chat.getAccount().getAccountId() : null;
                    Long clubId = chat.getClub() != null ? chat.getClub().getClubId() : null;
                    Long raccountId = chat.getRaccountId() != null ? chat.getRaccountId() : null;
                    return new ChatListDto(
                            chat.getChatId(),
                            accountIdFromChat,
                            clubId,
                            chat.getChatRoom(),
                            raccountId
                    );
                })
                .collect(Collectors.toList());
    }
    @Transactional
    public Chat getOneToOneChatInfo(long accountId, long raccountId) {
        // raccountId가 1인 것만 조회
        Chat chat = chatRepository.findByAccountAccountIdAndRaccountId(accountId, raccountId);

        // 조회된 채팅 정보를 문자열로 반환 (여기서는 간단히 chat.toString()을 사용)
        return chat;
    }

    @Transactional
    public String getChatInfoByClubId(int clubId) {
        List<String> chatRooms = chatRepository.getChatRoomByClubId(clubId);
        if (!chatRooms.isEmpty()) {
        // 문자열로 반환
            return chatRooms.get(0).toString();
        } else {
            // 채팅방이 없을 때 처리
            return "null";
        }
    }


    // 채팅방을 생성하는 메소드 정의
    @Transactional
    public void insertClubChatRoom(int accountId, String chatRoom, int clubId) {
        chatRepository.insertClubChatRoom(accountId, chatRoom, clubId);
    }

    @Transactional
    public void insertChatRoom(int accountId, String chatRoom, int raccountid) {
        chatRepository.insertChatRoom(accountId, chatRoom, raccountid);
    }


    public void insertClubChatRoom(Chat chat) {
        chatRepository.save(chat);
    }

    public String getChatInfo(int accountId, int clubId) {
        List<String> chatRooms = chatRepository.getClubChatRoom(accountId, clubId);
        if (!chatRooms.isEmpty()) {
            // 여러 개의 채팅방 반환
            return chatRooms.get(0);
        } else {
            // 채팅방이 없을 때 처리
            return "null";
        }
    }






}