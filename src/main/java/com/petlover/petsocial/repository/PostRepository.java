package com.petlover.petsocial.repository;

import com.petlover.petsocial.model.entity.Pet;
import com.petlover.petsocial.model.entity.Pet_Type;
import com.petlover.petsocial.model.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query(value="Select * From post p WHERE p.enable = 1 and p.status = 1 order by p.id desc",nativeQuery = true)
    public List<Post> getAll();
    @Query(value="Select * From post p WHERE p.enable = 1 and p.status = 1 and p.user_id=%?1% order by p.id desc",nativeQuery = true)
    public List<Post> getAllYourPost(int id);
//    @Query(value="Select * From post p WHERE p.enable = 1 and p.status = 1 and p.content like CONCAT('%',%?1%,'%') ",nativeQuery = true)
//    public List<Post> searchPost(String content);
    public Post getById(int id);

    @Query(value="Select * From post p WHERE p.enable = 0 and p.status = 1",nativeQuery = true)
    public List<Post> getAllPostDisable();
    @Query(value="Select * From post p",nativeQuery = true)
    public List<Post> getAllPostForAdmin();
    @Query(value="Select * From post p WHERE p.status = 0",nativeQuery = true)
    public List<Post> getAllPostDeleteForAdmin();
    @Query(value="Select * From post p WHERE p.status = 1",nativeQuery = true)
    public List<Post> getAllPostDisplayUserForAdmin();
}
