package com.petlover.petsocial.service;

import com.petlover.petsocial.exception.PetException;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PetService {
    public PetDTO insertPet(CreatePetDTO createPetDTO, UserDTO userDTO) throws PetException;
    public List<PetDTO> getAllPet(UserDTO userDTO);
    public PetDTO deletePet(Long id,UserDTO userDTO) throws PetException;
    public PetDTO getOnePet(Long id, UserDTO userDTO);
    public PetDTO updatePet(Long id,PetUpdateDTO petUpdateDTO, UserDTO userDTO);
    public List<PetToPostDTO> getAllPetPost();
}
