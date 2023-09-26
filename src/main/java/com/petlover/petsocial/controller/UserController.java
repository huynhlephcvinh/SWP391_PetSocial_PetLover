package com.petlover.petsocial.controller;


import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.response.ResponseData;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    HttpSession session;
    @Autowired
    private UserService userService;






    @GetMapping("/profile")
    public ResponseEntity<?> profile( @AuthenticationPrincipal OAuth2User usero2) {
        ResponseData responseData = new ResponseData();

        if (usero2 != null) {
            String email = usero2.getAttribute("email");
           User user = userService.getUserByEmail(email);
            session.setAttribute("user",user);
            responseData.setData(user);

            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } else {
            User user1 = (User) session.getAttribute("user");
            responseData.setData(user1);

        }
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}
