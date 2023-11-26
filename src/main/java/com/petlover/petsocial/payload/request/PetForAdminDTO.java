package com.petlover.petsocial.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PetForAdminDTO {
    private Long id;
    private String image;
    private String name;
    private String description;
    private String user_name;
    private boolean status;
    private String petType_name;
}
