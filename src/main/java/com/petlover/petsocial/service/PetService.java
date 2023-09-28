package com.petlover.petsocial.service;

import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.PetDTO;
import com.petlover.petsocial.payload.request.PetToPostDTO;
import com.petlover.petsocial.payload.request.PetUpdateDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PetService {
    public void insertPet(MultipartFile file, String name, String description, User user, int petTypeId);
    public List<PetDTO> getAllPet();
    public PetDTO deletePet(int id);
    public PetDTO getOnePet(int id);
    public PetDTO updatePet(PetUpdateDTO petUpdateDTO);
    public List<PetToPostDTO> getAllPetPost();
}
