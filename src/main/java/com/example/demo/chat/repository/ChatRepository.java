package com.example.demo.chat.repository;

import com.example.demo.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {



    // account_id로 채팅방을 찾는 메소드 정의
    @Query(value = "SELECT chat_room FROM chat WHERE account_id = ?1" , nativeQuery = true)
    String getChatIdByAccountId(int accountId);

    @Query(value = "SELECT club_id FROM chat WHERE account_id = ?1", nativeQuery = true)
    List<Integer> getClubIdsByAccountId(int accountId);

    @Query(value = "SELECT chat_room FROM chat WHERE account_id = ?1 AND club_id = ?2", nativeQuery = true)
    List<String> getClubChatRoom(int accountId, int clubId);

    @Query(value = "SELECT * FROM chat WHERE account_id = ?1", nativeQuery = true)
    List<Chat> getChatListByAccountId(int accountId);

    // 채팅방을 생성하는 메소드 정의

    @Modifying
    @Query(value = "INSERT INTO chat (account_id, chat_room, club_id, chat_name) VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void insertClubChatRoom(int accountId, String chatRoom, int clubId, String chatName);

    @Modifying
    @Query(value = "INSERT INTO chat (account_id, chat_room, raccount_id, chat_name) VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void insertChatRoom(int accountId, String chatRoom, int raccountId, String chatName);

    List<Chat> findByAccountAccountId(long accountId);

    Chat findByAccountAccountIdAndRaccountId(long accountId, long raccountId);

    // club_id로 채팅방을 찾는 메소드 정의
    @Query(value = "SELECT chat_room FROM chat WHERE club_id = ?1", nativeQuery = true)
    List<String> getChatRoomByClubId(int clubId);

    void deleteByChatIdAndChatRoom(int chatId, String chatRoom);

//    @Query("SELECT chat.chatRoom FROM Chat chat WHERE (chat.accountid.accountId = :accountid AND chat.clubid.clubId = :clubid) OR (chat.accountid.accountId = :clubid AND chat.clubid.clubId = :accountid)")
//    String findChatInfoByAccountIdAndClubId(@Param("accountid") int accountid, @Param("clubid") int clubid);
}
