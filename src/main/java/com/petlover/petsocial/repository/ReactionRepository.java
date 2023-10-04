package com.petlover.petsocial.repository;

import com.petlover.petsocial.model.entity.Post;
import com.petlover.petsocial.model.entity.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReactionRepository extends JpaRepository<Reaction, Integer> {
     @Query("SELECT r FROM Reaction r WHERE r.user.id = :idUser and r.post.id= :idPost")
    public Reaction isReactionExist(@Param("idUser") int idUser,@Param("idPost") int idPost);
    @Query("SELECT r FROM Reaction r WHERE r.post.id= :idPost")
     public List<Reaction> findByPostId(@Param("idPost") int idPost);

    public void deleteById(int id);
}
