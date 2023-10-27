package com.petlover.petsocial.websocket.domain;

import com.petlover.petsocial.model.entity.Exchange;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "chatroom")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Chatroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "chatroom_id")
    private String chatroomId;

    @Column(name="sender_id")
    private int senderId;

    @Column(name="recipient_id")
    private int recipientId;

//    @ManyToOne
//    @JoinColumn(name = "exchange_id")
//    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
//    private Exchange exchange;
}