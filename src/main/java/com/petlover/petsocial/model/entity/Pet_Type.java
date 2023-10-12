package com.petlover.petsocial.model.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

@Table(name="Pet_Type")
public class Pet_Type {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name", columnDefinition = "nvarchar(255)")
    private String name;
    @OneToMany(mappedBy = "pet_type", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Pet> pets;
}
