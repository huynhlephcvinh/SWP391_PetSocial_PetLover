package com.petlover.petsocial.repository;

import com.petlover.petsocial.model.entity.Post;
import com.petlover.petsocial.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    public boolean existsByEmail(String email);


    public User findByEmail(String email);

    public User findById(int id);


    public User findByVerificationCode(String code);
    public User findByResetPasswordToken(String token);

    public User getById(int id);
    @Query(value="SELECT * FROM user u where u.role <> \"ROLE_ADMIN\"",nativeQuery = true)
    public List<User> listUser();

    @Query(value="SELECT * FROM user u where u.enable=1",nativeQuery = true)
    public List<User> listUserHome();
    public Optional<User> findByName(String name);

    @Query(value="SELECT * FROM user u where u.role <> \"ROLE_ADMIN\" and u.name like CONCAT('%',%?1%,'%') ",nativeQuery = true)
    public List<User> searchUserForAdmin(String name);

}
