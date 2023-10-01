package com.petlover.petsocial.repository;

import com.petlover.petsocial.model.entity.Pet;
import com.petlover.petsocial.model.entity.Pet_Type;
import com.petlover.petsocial.model.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query(value="Select * From post p WHERE p.enable = 1 and p.status = 1",nativeQuery = true)
    public List<Post> getAll();
    @Query(value="Select * From post p WHERE p.enable = 1 and p.status = 1 and p.user_id=%?1%",nativeQuery = true)
    public List<Post> getAllYourPost(int id);

    public Post getById(int id);

}
