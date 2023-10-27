package com.petlover.petsocial.websocket.repository;

import com.petlover.petsocial.websocket.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    @Query("FROM Message m WHERE m.senderId = :senderId AND m.recipientId = :recipientId")
    List<Message> findChatMessagesFromSelectedUser(int senderId, int recipientId);

    @Query("FROM Message m WHERE m.chatroomId = :chatroomId")
    List<Message> findChatMessagesByChatroomId(String chatroomId);

    @Query("SELECT COUNT(*) FROM Message m WHERE m.recipientId = :currentUserId AND m.senderId = :onlineUserId AND m.status = 'RECEIVED'")
    int countNewMessagesFromOnlineUser(int currentUserId, int onlineUserId);
}
