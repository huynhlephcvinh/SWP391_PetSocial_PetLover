package com.petlover.petsocial.controller;


import com.petlover.petsocial.exception.PostException;
import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.PostDTO;
import com.petlover.petsocial.payload.request.UserDTO;
import com.petlover.petsocial.payload.request.UserForAdminDTO;
import com.petlover.petsocial.payload.response.ResponseData;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.AdminService;
import com.petlover.petsocial.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private AdminService adminService;


    @GetMapping("/getAllUser")
    public ResponseEntity<?> getAllPostDisable(@RequestHeader("Authorization") String jwt) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        User user = userRepo.getById(userDTO.getId());
        if(user.getRole().equals("ROLE_ADMIN")){
            List<UserForAdminDTO> list = adminService.getListUserForAdmin();
            responseData.setData(list);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }else{
            responseData.setData("Only Admin");
            responseData.setStatus(403);
            responseData.setIsSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{idUser}/block")
    public ResponseEntity<?> getBlockUser(@PathVariable int idUser,@RequestHeader("Authorization") String jwt) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        User user = userRepo.getById(userDTO.getId());
        if(user.getRole().equals("ROLE_ADMIN")){
           UserForAdminDTO userForAdminDTO = adminService.getBlockUser(idUser);
            responseData.setData(userForAdminDTO);
            return new ResponseEntity<>(responseData, HttpStatus.OK);

        }else{
            responseData.setData("Only Admin");
            responseData.setStatus(403);
            responseData.setIsSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/{idUser}/offblock")
    public ResponseEntity<?> getOffBlockUser(@PathVariable int idUser,@RequestHeader("Authorization") String jwt) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        User user = userRepo.getById(userDTO.getId());
        if(user.getRole().equals("ROLE_ADMIN")){
            UserForAdminDTO userForAdminDTO = adminService.getOffBlockUser(idUser);
            responseData.setData(userForAdminDTO);
            return new ResponseEntity<>(responseData, HttpStatus.OK);

        }else{
            responseData.setData("Only Admin");
            responseData.setStatus(403);
            responseData.setIsSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/totaluser")
    public ResponseEntity<?> getTotalUser(@RequestHeader("Authorization") String jwt) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        User user = userRepo.getById(userDTO.getId());
        if(user.getRole().equals("ROLE_ADMIN")){
           int total = adminService.getTotalUser();
            responseData.setData(total);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }else{
            responseData.setData("Only Admin");
            responseData.setStatus(403);
            responseData.setIsSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> getSearchUser(@RequestParam("name") String name,@RequestHeader("Authorization") String jwt) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        User user = userRepo.getById(userDTO.getId());
        if(user.getRole().equals("ROLE_ADMIN")){
            List<UserForAdminDTO> list = adminService.searchUser(name);
            responseData.setData(list);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }else{
            responseData.setData("Only Admin");
            responseData.setStatus(403);
            responseData.setIsSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }
    }


}
