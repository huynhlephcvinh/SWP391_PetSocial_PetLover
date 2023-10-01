package com.petlover.petsocial.repository;

import com.petlover.petsocial.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    public boolean existsByEmail(String email);


    public User findByEmail(String email);

    public User findByVerificationCode(String code);
    public User findByResetPasswordToken(String token);

    public User getById(int id);


}
