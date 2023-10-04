package com.petlover.petsocial.controller;


import com.petlover.petsocial.config.JwtProvider;
import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.exception.UserNotFoundException;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.SigninDTO;
import com.petlover.petsocial.payload.request.SingupDTO;
import com.petlover.petsocial.payload.response.AuthResponse;
import com.petlover.petsocial.payload.response.ResponseData;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.UserService;
import com.petlover.petsocial.serviceImp.CustomerUserDetailsServiceImp;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import jdk.jshell.spi.ExecutionControl;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.io.UnsupportedEncodingException;
import java.security.Principal;

@RestController

public class HomeController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    HttpSession session;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private CustomerUserDetailsServiceImp customerUserDetailsServiceImp;

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


    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/signin")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @PostMapping("/createUser")
    public ResponseEntity<?> createuser(@RequestBody SingupDTO userDTO, HttpSession session, HttpServletRequest request) throws UserException {
        String url = request.getRequestURL().toString();
        http://localhost:8080/createUser
        url = url.replace(request.getServletPath(), "");
        System.out.println(userDTO);
        boolean f = userService.checkEmail(userDTO.getEmail());
        ResponseData responseData = new ResponseData();
        if (f) {
            throw new UserException("Email is already used with another account");
        } else {

            SingupDTO userDtls = userService.createUser(userDTO,url);
            Authentication authentication = new UsernamePasswordAuthenticationToken(userDTO.getEmail(),userDTO.getPassword());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtProvider.generateToken(authentication);
            AuthResponse res = new AuthResponse(token ,true);

            responseData.setData(res);

        }

        return new ResponseEntity<>(responseData, HttpStatus.CREATED);
    }
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SigninDTO signinDTO) throws UserException{
        ResponseData responseData = new ResponseData();
        System.out.println(signinDTO);
//        if(userService.checkLogin(signinDTO)){
//            String token = jwtUtilHelper.generateToken(signinDTO.getUsername());
//            responseData.setData(token);
//            User user = userService.getUserByEmail(signinDTO.getUsername());
//            session.setAttribute("user",user);
//
//        }else{
//            responseData.setData("");
//            responseData.setIsSuccess(false);
//        }
        if(userService.checkLogin(signinDTO)) {
            Authentication authentication = authenticate(signinDTO.getUsername(), signinDTO.getPassword());
            String token = jwtProvider.generateToken(authentication);
            AuthResponse res = new AuthResponse(token, true);

            responseData.setData(res);

        }else{
            throw new UserException("Email not enable");
        }
        return new ResponseEntity<>(responseData, HttpStatus.ACCEPTED);
    }
    private Authentication authenticate( String username, String password) {
        UserDetails userDetails = customerUserDetailsServiceImp.loadUserByUsername(username);
        if(userDetails==null) {
            throw new BadCredentialsException("Invalid username..");

        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("Invalid username or password..");
        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }
    @GetMapping("/verify")
    public String verifyAccount(@Param("code") String code, Model m) {
        boolean f = userService.verifyAccount(code);

        if (f) {
            m.addAttribute("msg", "Sucessfully your account is verified");
        } else {
            m.addAttribute("msg", "may be your vefication code is incorrect or already veified ");
        }

        return "message";
    }

    @GetMapping("/forgot_password")
    public String showForgotPasswordForm(Model model) {
        model.addAttribute("pageTitle","Forgot Password");
        return "forgot_password_form";
    }
    @PostMapping("/forgot_password")
    public String processForgotPassword(@RequestParam String email,HttpServletRequest request, Model model) {
        String token = RandomString.make(30);
        System.out.println("Email: " + email);
        System.out.println("Token: " + token);

        try {
            userService.updateResetPasswordToken(token, email);
            String url = request.getRequestURL().toString();
            url = url.replace(request.getServletPath(), "")  + "/reset_password?token=" + token;
            System.out.println(url);
//            String resetPasswordLink = Utility.getSiteURL(request) + "/reset_password?token=" + token;
            sendEmail(email, url);
            model.addAttribute("message", "We have sent a reset password link to your email. Please check.");
//
        } catch (UserNotFoundException ex) {
            model.addAttribute("error", ex.getMessage());
        } catch (UnsupportedEncodingException | MessagingException e) {
            model.addAttribute("error", "Error while sending email");
        }

        return "forgot_password_form";
    }

    public void sendEmail(String recipientEmail, String link)
            throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("phucvinh710@gmail.com", "We Are Support");
        helper.setTo(recipientEmail);

        String subject = "Here's the link to reset your password";

        String content = "<p>Hello,</p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><a href=\"" + link + "\">Change my password</a></p>"
                + "<br>"
                + "<p>Ignore this email if you do remember your password, "
                + "or you have not made the request.</p>";

        helper.setSubject(subject);

        helper.setText(content, true);

        mailSender.send(message);
    }
    @GetMapping("/reset_password")
    public String showResetPasswordForm(@Param(value = "token") String token, Model model) {
        User user = userService.getByResetPasswordToken(token);
        model.addAttribute("token", token);

        if (user == null) {
            model.addAttribute("message", "Invalid Token");
            return "message";
        }

        return "reset_password_form";
    }
    @PostMapping("/reset_password")
    public String processResetPassword(HttpServletRequest request, Model model) {
        String token = request.getParameter("token");
        String password = request.getParameter("password");

        User user = userService.getByResetPasswordToken(token);
        model.addAttribute("title", "Reset your password");

        if (user == null) {
            model.addAttribute("message", "Invalid Token");
            return "message";
        } else {
            userService.updatePassword(user, password);

            model.addAttribute("message", "You have successfully changed your password.");
        }

        return "reset_password_form";
    }



}
