package com.petlover.petsocial.model.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

@Table(name="Post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "content", columnDefinition = "nvarchar(1111)")
    private String content;
    @Column(name = "image", columnDefinition = "nvarchar(1111)")
    private String image;
    private boolean enable;
    private String create_date;
    private int total_like;

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

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Comment> comments;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Reaction> reactions;
    @Column(name = "status")
    private boolean status;

}
