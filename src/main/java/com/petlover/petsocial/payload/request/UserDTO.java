package com.petlover.petsocial.payload.request;

import com.petlover.petsocial.model.entity.Exchange;
import com.petlover.petsocial.model.entity.Pet;
import com.petlover.petsocial.model.entity.Post;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String avatar;
    private String role;
    private List<PetDTO> petDTOList;
    private List<PostDTO> postDTOList;

}
