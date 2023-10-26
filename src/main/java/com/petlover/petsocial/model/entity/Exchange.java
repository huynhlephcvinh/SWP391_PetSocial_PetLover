package com.petlover.petsocial.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="Exchange")
public class Exchange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date exchange_date;
    private int payment_amount;
    private String description;

    @Enumerated(EnumType.STRING)
    private ExStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Pet pet;

    @OneToMany(mappedBy = "exchange", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Apply> applies;
    @OneToMany(mappedBy = "exchange", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Chat> chats;
}
