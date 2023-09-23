package com.petlover.petsocial.config.oauth;


import com.petlover.petsocial.model.entity.AuthenticationProvider;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Autowired
    private UserService userService;

    private UserDetailsService userDetailsService;
    @Autowired
    HttpSession session;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User =(CustomOAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getEmail();
        String name = oAuth2User.getName();
        System.out.println("email: " + email);
        System.out.println("name: " + name);
        User user = userService.getUserByEmail(email);
        if(user == null){
            User user1 = userService.createUserAfterOAuthLoginSuccess(email,name, AuthenticationProvider.GOOGLE);
            if(user1.getRole().contains("ROLE_USER")) {
                response.sendRedirect("/user/profile");
            }else {
                response.sendRedirect("/admin/profile");
            }
        }else {
            User user1 = userService.updateUserAfterOAuthLoginSuccess(user,name);

            if(user1.getRole().contains("ROLE_USER")) {
                response.sendRedirect("/user/profile");
            }else {
                response.sendRedirect("/admin/profile");
            }
        }
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
