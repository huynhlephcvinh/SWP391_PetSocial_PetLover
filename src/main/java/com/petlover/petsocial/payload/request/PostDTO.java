package com.petlover.petsocial.payload.request;

import com.petlover.petsocial.model.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostDTO {
    private int id;
    private String image;
    private String content;
    private String create_date;
    private int total_like;
    private List<Comment> comments;
    private PetToPostDTO petToPostDTO;
    private UserPostDTO userPostDTO;

}
