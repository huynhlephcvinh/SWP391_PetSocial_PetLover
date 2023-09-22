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
@Table(name="User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name", columnDefinition = "nvarchar(255)")
    private String name;
    @Column(name = "email", columnDefinition = "nvarchar(255)", unique = true)
    private String email;
    @Column(name = "password", columnDefinition = "nvarchar(255)")
    private String password;
    @Column(name = "phone", columnDefinition = "nvarchar(255)")
    private String phone;
    @Column(name = "avatar", columnDefinition = "nvarchar(1111)")
    private String avatar;
    @Column(name = "role", columnDefinition = "nvarchar(100)")
    private String role;
    private boolean enable;
    private String verification_code;
    @Enumerated(EnumType.STRING)
    @Column(name = "auth_provider")
    private AuthenticationProvider authProvider;
    @Column(name = "reset_password_token")
    private String resetPasswordToken;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Pet> pets;


}
