package com.petlover.petsocial.controller;


import com.petlover.petsocial.config.JwtProvider;
import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.UserDTO;
import com.petlover.petsocial.payload.request.UserUpdateDTO;
import com.petlover.petsocial.payload.response.ResponseData;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    HttpSession session;
    @Autowired
    private UserService userService;

    //@AuthenticationPrincipal OAuth2User usero2

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String jwt) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        responseData.setData(userDTO);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/update")
    @ResponseBody
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String jwt, @ModelAttribute UserUpdateDTO userDTO) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO1 = userService.findUserProfileByJwt(jwt);

        UserDTO userDTO2 = userService.editprofile(userDTO1.getId(),userDTO);
        responseData.setData(userDTO2);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("/profile/{id}")
    public ResponseEntity<?> getUserProfileById(@PathVariable(value = "id") Long id) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileById(id);
        responseData.setData(userDTO);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


}
