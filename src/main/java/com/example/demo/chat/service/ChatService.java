package com.example.demo.chat.service;


import com.example.demo.account.dto.AccountDetails;
import com.example.demo.account.entity.Account;
import com.example.demo.account.repository.AccountRepository;
import com.example.demo.alarm.dto.AlarmDto;
import com.example.demo.alarm.service.AlarmServiceImpl;
import com.example.demo.chat.dto.ChatListDto;
import com.example.demo.chat.entity.Chat;
import com.example.demo.chat.repository.ChatRepository;
import com.example.demo.club.entity.Club;
import com.example.demo.club.service.ClubService;
import com.example.demo.membership.entity.Membership;
import com.example.demo.membership.repository.MembershipRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;


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
                            raccountId,
                            chat.getChatName()
                    );
                })
                .collect(Collectors.toList());
    }
    @Transactional
    public Chat getOneToOneChatInfo(long accountId, long raccountId) {
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
            return null;
        }
    }


    // 채팅방을 생성하는 메소드 정의
    @Transactional
    public void insertClubChatRoom(int accountId, String chatRoom, int clubId, String chatName) {
        chatRepository.insertClubChatRoom(accountId, chatRoom, clubId, chatName);

        // 클럽 정보와 클럽의 모든 회원 조회
//        Club club = clubService.findClubById(clubId);
//
//        // 클럽의 모든 회원 정보를 조회합니다.
//        List<Membership> memberships = membershipRepository.findByClub(club);
//
//
//        // 클럽의 모든 회원에게 새로운 단체 채팅방 생성에 대한 알림을 보냅니다.
//        memberships.forEach(membership -> {
//            Account member = membership.getAccount();
//            String message = "새로운 단체 채팅방 '" + chatName + "'이 생성되었습니다.";
//
//            // 알림 데이터를 생성합니다.
//            AlarmDto alarmDto = AlarmDto.builder()
//                    .targetId(member.getId()) // 회원의 ID를 targetId로 설정합니다.
//                    .targetTypeId(clubId) // 클럽 ID를 targetTypeId로 설정합니다.
//                    .type("CHAT") // 알림 타입을 "CHAT"으로 설정합니다.
//                    .description(message) // 알림 메시지를 설정합니다.
//                    .importance(3) // 알림의 중요도를 설정합니다.
//                    .build();
//
//            // 알림 서비스를 통해 알림을 보냅니다.
//            alarmService.createAlarm(alarmDto, accountDeatils); // accountDetails를 넘기는 부분은 alarmService의 구현에 따라 조정이 필요할 수 있습니다.
//        });


    }

    @Transactional
    public void insertChatRoom(int accountId, String chatRoom, int raccountid, String chatName) {
        chatRepository.insertChatRoom(accountId, chatRoom, raccountid, chatName);
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
            return null;
        }
    }

    @Transactional
    public void deleteChatRoom(int chatId, String chatRoom) {
        chatRepository.deleteByChatIdAndChatRoom(chatId, chatRoom);
    }
}