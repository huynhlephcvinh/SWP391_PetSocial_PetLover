package com.petlover.petsocial.service;

import com.petlover.petsocial.model.entity.Pet_Type;
import com.petlover.petsocial.payload.request.PetTypeDTO;

import java.util.List;

public interface PetTypeService {
    public List<PetTypeDTO> getAllTypePet();
    public Pet_Type getPetType(int id);
}
