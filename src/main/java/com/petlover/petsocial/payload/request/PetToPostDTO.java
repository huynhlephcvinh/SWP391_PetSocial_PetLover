package com.petlover.petsocial.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PetToPostDTO {
    private int id;
    private String image;
    private String name;
}
