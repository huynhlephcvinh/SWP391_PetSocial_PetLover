package com.petlover.petsocial.repository;

import com.petlover.petsocial.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    public boolean existsByEmail(String email);


    public User findByEmail(String email);

    public User findById(int id);


    public User findByVerificationCode(String code);
    public User findByResetPasswordToken(String token);

    public User getById(int id);

    public Optional<User> findByName(String name);
}
