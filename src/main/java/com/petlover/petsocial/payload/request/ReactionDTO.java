package com.petlover.petsocial.payload.request;

import com.petlover.petsocial.model.entity.Post;
import com.petlover.petsocial.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReactionDTO {
    private int id;
    private UserDTO userDTO;
    private PostDTO postDTO;
}
