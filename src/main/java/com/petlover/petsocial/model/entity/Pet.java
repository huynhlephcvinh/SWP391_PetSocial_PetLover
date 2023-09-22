package com.petlover.petsocial.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="Pet")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name", columnDefinition = "nvarchar(255)")
    private String name;
    @Column(name = "description", columnDefinition = "nvarchar(1111)")
    private String description;
    @Column(name = "image", columnDefinition = "nvarchar(1111)")
    private String image;
    private boolean status;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;
    @ManyToOne
    @JoinColumn(name = "pet_type_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Pet_Type pet_type;





}
