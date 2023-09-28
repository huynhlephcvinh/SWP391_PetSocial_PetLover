package com.petlover.petsocial.controller;

import com.petlover.petsocial.model.entity.Pet;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.PetDTO;
import com.petlover.petsocial.payload.request.PetToPostDTO;
import com.petlover.petsocial.payload.request.PetTypeDTO;
import com.petlover.petsocial.payload.request.PostDTO;
import com.petlover.petsocial.payload.response.ResponseData;
import com.petlover.petsocial.service.PetService;
import com.petlover.petsocial.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    HttpSession session;
    @Autowired
    PetService petService;
    @Autowired
    HttpServletRequest request;
    @Autowired
    PostService postService;
    @GetMapping("/createpost")
    public ResponseEntity<?> choosePetToPost(){
        ResponseData responseData = new ResponseData();
        List<PetToPostDTO> list = petService.getAllPetPost();
        request.setAttribute("listYourPet",list);
        responseData.setData(list);
        return new ResponseEntity<>(responseData, HttpStatus.OK);

    }
    @PostMapping("/createpost")
    public ResponseEntity<?> createPet(@RequestParam MultipartFile file, @RequestParam String content, @RequestParam String idPet){
        ResponseData responseData = new ResponseData();
        User user = (User) session.getAttribute("user");
        postService.insertPet(file,content,user,Integer.parseInt(idPet));
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }

    @GetMapping("/getAllPost")
    public ResponseEntity<?> getAllPost(){
        ResponseData responseData = new ResponseData();
        List<PostDTO> list = postService.getAllPost();
        request.setAttribute("listPet",list);
        responseData.setData(list);
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }



}
