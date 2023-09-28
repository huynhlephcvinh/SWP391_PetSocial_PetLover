package com.petlover.petsocial.controller;

import com.petlover.petsocial.model.entity.Pet_Type;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.PetDTO;
import com.petlover.petsocial.payload.request.PetTypeDTO;
import com.petlover.petsocial.payload.request.PetUpdateDTO;
import com.petlover.petsocial.payload.response.ResponseData;
import com.petlover.petsocial.service.CloudinaryService;
import com.petlover.petsocial.service.PetService;
import com.petlover.petsocial.service.PetTypeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/pet")
public class PetController {


    @Autowired
    PetTypeService petTypeService;
    @Autowired
    PetService petService;
    @Autowired
    HttpServletRequest request;
    @Autowired
    HttpSession session;
    @GetMapping("/createpet")
    public ResponseEntity<?> createTypePet(){
        ResponseData responseData = new ResponseData();
        List<PetTypeDTO> list = petTypeService.getAllTypePet();
        request.setAttribute("listTypePet",list);
        responseData.setData(list);
        return new ResponseEntity<>(responseData,HttpStatus.OK);

    }

    @PostMapping("/createpet")
    public ResponseEntity<?> createPet(@RequestParam MultipartFile file, @RequestParam String name,@RequestParam String description,@RequestParam String idPetType){
        ResponseData responseData = new ResponseData();
        User user = (User) session.getAttribute("user");
        petService.insertPet(file,name,description,user,Integer.parseInt(idPetType));
       return new ResponseEntity<>(responseData,HttpStatus.OK);
  }
    @GetMapping("/getAllPet")
    public ResponseEntity<?> getAllPet(){
        ResponseData responseData = new ResponseData();
        List<PetDTO> list = petService.getAllPet();
        request.setAttribute("listPet",list);
        responseData.setData(list);
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deletePet(@PathVariable(value = "id") int id){
        ResponseData responseData = new ResponseData();
          PetDTO petDTO = petService.deletePet(id);
        responseData.setData(petDTO);
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }
    @GetMapping("/getOnePet/{id}")
    public ResponseEntity<?> getOnePet(@PathVariable(value = "id") int id){
        ResponseData responseData = new ResponseData();
        PetDTO petDTO = petService.getOnePet(id);
        if(petDTO ==null){
            responseData.setData("not found");
            return new ResponseEntity<>(responseData,HttpStatus.BAD_REQUEST);
        }
        responseData.setData(petDTO);
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }
    @PostMapping("/updatePet")
    //@PostMapping ("/updatePet")
    public  ResponseEntity<?> updatePet( @RequestBody PetUpdateDTO petUpdateDTO){
        ResponseData responseData = new ResponseData();
        PetDTO petDTO1 = petService.updatePet(petUpdateDTO);
        if(petDTO1 ==null){
            responseData.setData("not found");
            return new ResponseEntity<>(responseData,HttpStatus.BAD_REQUEST);
        }
        responseData.setData(petDTO1);
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }


}
