package com.petlover.petsocial.websocket.repository;

import com.petlover.petsocial.websocket.domain.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom, Integer> {
    @Query("FROM Chatroom c WHERE c.senderId = :senderId AND c.recipientId = :recipientId")
    Optional<Chatroom> findChatroomBySenderIdAndRecipientId(int senderId, int recipientId);
}
