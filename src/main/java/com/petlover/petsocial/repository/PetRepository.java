package com.petlover.petsocial.repository;

import com.petlover.petsocial.model.entity.Pet;
import com.petlover.petsocial.model.entity.Pet_Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Integer> {
   @Query(value="Select * From pet p WHERE p.user_id = %?1% and p.status = 1",nativeQuery = true)
    public List<Pet> getAllByIdUser(int id);
    public Pet getById(int id);
    @Query(value="Select * From pet p WHERE p.pet_type_id = %?1% and p.status = 1",nativeQuery = true)
    public List<Pet> getAllByPetType(int id);

    @Query(value="Select * From pet p",nativeQuery = true)
    public List<Pet> getAllPetForAdmin();

 @Query(value="Select * From pet p WHERE p.status =1",nativeQuery = true)
 public List<Pet> getAllPetDisplayForAdmin();


}
