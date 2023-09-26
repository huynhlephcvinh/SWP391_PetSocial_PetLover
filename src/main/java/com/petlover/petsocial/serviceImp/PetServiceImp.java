package com.petlover.petsocial.serviceImp;


import com.petlover.petsocial.model.entity.Pet;
import com.petlover.petsocial.model.entity.Pet_Type;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.PetDTO;
import com.petlover.petsocial.payload.request.PetUpdateDTO;
import com.petlover.petsocial.repository.PetRepository;
import com.petlover.petsocial.repository.PetTypeRepository;
import com.petlover.petsocial.service.CloudinaryService;
import com.petlover.petsocial.service.PetService;
import com.petlover.petsocial.service.PetTypeService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class PetServiceImp implements PetService {
    @Autowired
    CloudinaryService cloudinaryService;
    @Autowired
    PetTypeRepository petTypeRepository;
    @Autowired
    PetTypeService petTypeService;
    @Autowired
    PetRepository petRepository;
    @Autowired
    HttpSession session;
    @Override
    public void insertPet(MultipartFile file, String name, String description, User user, int petTypeId) {
        try {
            String image = cloudinaryService.uploadFile(file);
            Pet_Type pet_type = petTypeService.getPetType(petTypeId);
            System.out.println(pet_type);
            Pet newPet = new Pet();
            newPet.setImage(image);
            newPet.setName(name);
            newPet.setDescription(description);
            newPet.setUser(user);
            newPet.setPet_type(pet_type);
            newPet.setStatus(true);
            petRepository.save(newPet);
        } catch (Exception e) {
            System.out.println("Err insert restaurant: " + e.getMessage());
        }

    }
    @Override
    public List<PetDTO> getAllPet()
    {
        User user = (User) session.getAttribute("user");
          List<Pet> petList= petRepository.getAllByIdUser(user.getId());
          List<PetDTO> listpetDTO = new ArrayList<>();
          for(Pet pet : petList) {
              PetDTO petDTO = new PetDTO();
              petDTO.setId(pet.getId());
              petDTO.setName(pet.getName());
              petDTO.setDescription(pet.getDescription());
              petDTO.setImage(pet.getImage());
              listpetDTO.add(petDTO);
        }
        return listpetDTO;
    }
    @Override
    public PetDTO deletePet(int id)
    {
        Pet getPet = petRepository.getById(id);
        getPet.setStatus(false);
        petRepository.save(getPet);
        return new PetDTO(getPet.getId(),getPet.getImage(), getPet.getName(),getPet.getDescription());
    }
    @Override
    public PetDTO getOnePet(int id)
    {
        Pet getPet = petRepository.getById(id);
        return new PetDTO(getPet.getId(),getPet.getImage(), getPet.getName(),getPet.getDescription());

    }
    @Override
    public PetDTO updatePet(PetUpdateDTO petUpdateDTO)
    {

        Pet getPet = petRepository.getById(petUpdateDTO.getId());
        if(getPet==null){
            return null;
        }
        if(petUpdateDTO.getFile() == null){
            getPet.setName(petUpdateDTO.getName());
            getPet.setDescription(petUpdateDTO.getDescription());
            petRepository.save(getPet);
            return new PetDTO(getPet.getId(),getPet.getImage(), getPet.getName(),getPet.getDescription());
        }else{
            String image = cloudinaryService.uploadFile(petUpdateDTO.getFile());
            getPet.setImage(image);
            getPet.setName(petUpdateDTO.getName());
            getPet.setDescription(petUpdateDTO.getDescription());
            petRepository.save(getPet);
        }
        return new PetDTO(getPet.getId(),getPet.getImage(), getPet.getName(),getPet.getDescription());

    }


}
