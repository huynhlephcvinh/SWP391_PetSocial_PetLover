package com.petlover.petsocial.controller;

import com.petlover.petsocial.exception.PetException;
import com.petlover.petsocial.exception.PostException;
import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.model.entity.Pet;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.*;
import com.petlover.petsocial.payload.response.ResponseData;
import com.petlover.petsocial.service.PetService;
import com.petlover.petsocial.service.PostService;
import com.petlover.petsocial.service.UserService;
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
    @Autowired
    private UserService userService;
    @GetMapping("/createpost")
    public ResponseEntity<?> choosePetToPost(@RequestHeader("Authorization") String jwt) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        List<PetToPostDTO> list = petService.getAllPetPost(userDTO);
        responseData.setData(list);
        return new ResponseEntity<>(responseData, HttpStatus.OK);

    }
    @PostMapping("/createpost")
    @ResponseBody
    public ResponseEntity<?> createPost(@RequestHeader("Authorization") String jwt,@ModelAttribute CreatPostDTO creatPostDTO) throws UserException, PostException, PetException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        PostDTO postDTO = postService.insertPost(creatPostDTO,userDTO);
        if(postDTO==null) {
            throw new PostException("Erorr: not fill content");
        }
        responseData.setData(postDTO);
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }

    @GetMapping("/getAllPost")
    public ResponseEntity<?> getAllPost(){
        ResponseData responseData = new ResponseData();
        List<PostDTO> list = postService.getAllPost();
        responseData.setData(list);
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }
    @GetMapping("/getAllYourPost")
    public ResponseEntity<?> getAllYourPost(@RequestHeader("Authorization") String jwt) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        List<PostDTO> list = postService.getAllYourPost(userDTO.getId());
        request.setAttribute("listPost",list);
        responseData.setData(list);
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }

    @PostMapping ("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable(value = "id") int id,@RequestHeader("Authorization") String jwt) throws UserException, PostException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        PostDTO postDTO = postService.deletePost(id, userDTO);
        if(postDTO == null){
            throw new PostException("Not Found");
        }
        responseData.setData(postDTO);
        return new ResponseEntity<>(responseData,HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePost(@PathVariable(value = "id") int id, @ModelAttribute PostUpdateDTO postUpdateDTO,@RequestHeader("Authorization") String jwt) throws UserException, PostException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        PostDTO postDTO = postService.updatePost(id, postUpdateDTO,userDTO);
        if(postDTO == null){
         throw new PostException("Error can are content null or empty");
        }
        responseData.setData(postDTO);
        return new ResponseEntity<>(responseData,HttpStatus.OK);

    }

    @GetMapping("/search")
    public ResponseEntity<?> searchPost(@RequestParam("content") String content) throws UserException, PostException {
        ResponseData responseData = new ResponseData();
        List<PostDTO> list = postService.sreachPost(content);
        responseData.setData(list);
        return new ResponseEntity<>(responseData,HttpStatus.OK);

    }






}
