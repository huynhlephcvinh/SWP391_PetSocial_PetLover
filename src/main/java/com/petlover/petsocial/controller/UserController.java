package com.petlover.petsocial.controller;


import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    HttpSession session;
    @Autowired
    private UserService userService;

    @ModelAttribute
    public void commonUser(Principal p, Model m,@AuthenticationPrincipal OAuth2User usero2) {
        if (p != null) {
            String email = p.getName();
            User user = userRepo.findByEmail(email);
            m.addAttribute("user", user);
        }
        if(usero2 != null) {
            String email = usero2.getAttribute("email");
            User user = userRepo.findByEmail(email);
            m.addAttribute("user", user);
        }
    }

    @GetMapping("/profile")
    public String profile(Model model) {
        return "profile";
    }
}
