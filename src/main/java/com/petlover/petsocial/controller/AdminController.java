package com.petlover.petsocial.controller;


import com.petlover.petsocial.exception.PostException;
import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.*;
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
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

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
    public ResponseEntity<?> getAllAccount(@RequestHeader("Authorization") String jwt) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        User user = userRepo.getById(userDTO.getId());
        if(user.getRole().equals("ROLE_ADMIN")){
            List<UserForAdminManager> list = adminService.getListUserForAdmin();
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

    @GetMapping("/getAllPost")
    public ResponseEntity<?> getAllPost(@RequestHeader("Authorization") String jwt) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        User user = userRepo.getById(userDTO.getId());
        if(user.getRole().equals("ROLE_ADMIN")){
            List<PostForAdminDTO> list = adminService.listAllPost();
            responseData.setData(list);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }else{
            responseData.setData("Only Admin");
            responseData.setStatus(403);
            responseData.setIsSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAllPet")
    public ResponseEntity<?> getAllPet(@RequestHeader("Authorization") String jwt) throws UserException {
        ResponseData responseData = new ResponseData();
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        User user = userRepo.getById(userDTO.getId());
        if(user.getRole().equals("ROLE_ADMIN")){
            List<PetForAdminDTO> list = adminService.listAllPet();
            responseData.setData(list);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }else{
            responseData.setData("Only Admin");
            responseData.setStatus(403);
            responseData.setIsSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
        }
    }


        @GetMapping("/totalstatistics")
        public ResponseEntity<?> getTotalStatistics(@RequestHeader("Authorization") String jwt) throws UserException {
            ResponseData responseData = new ResponseData();
            UserDTO userDTO = userService.findUserProfileByJwt(jwt);
            User user = userRepo.getById(userDTO.getId());

            if(user.getRole().equals("ROLE_ADMIN")){
                Calendar cal = Calendar.getInstance();
                Date date = cal.getTime();
                DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm");
                String formattedDate = dateFormat.format(date);
                // Sử dụng các service để tính toán thông tin thống kê
                int totalUser = adminService.getTotalUser();
                int totalPostDelete = adminService.getTotalPostDete();
                int totalPet = adminService.getTotalPetDisplay();
                int totalPostDisplay = adminService.getTotalPostDisplay();
             //   int totalPostInMonth = adminService.getTotalPostDisplayInMonth();
                int totalPostInMonth01 = adminService.getTotalPostDisplayInMonth01();
                int totalPostInMonth02 = adminService.getTotalPostDisplayInMonth02();
                int totalPostInMonth03 = adminService.getTotalPostDisplayInMonth03();
                int totalPostInMonth04 = adminService.getTotalPostDisplayInMonth04();
                int totalPostInMonth05 = adminService.getTotalPostDisplayInMonth05();
                int totalPostInMonth06 = adminService.getTotalPostDisplayInMonth06();
                int totalPostInMonth07 = adminService.getTotalPostDisplayInMonth07();
                int totalPostInMonth08 = adminService.getTotalPostDisplayInMonth08();
                int totalPostInMonth09 = adminService.getTotalPostDisplayInMonth09();
                int totalPostInMonth10 = adminService.getTotalPostDisplayInMonth10();
                int totalPostInMonth11 = adminService.getTotalPostDisplayInMonth11();
                int totalPostInMonth12 = adminService.getTotalPostDisplayInMonth12();
                // Tạo một đối tượng JSON để chứa thông tin thống kê
                Map<String, Integer> statistics = new HashMap<>();
                statistics.put("totalUser", totalUser);
                statistics.put("totalPostDelete", totalPostDelete);
                statistics.put("totalPet", totalPet);
                statistics.put("totalPostDisplay", totalPostDisplay);
  //              statistics.put("totalPostInMonth" +formattedDate.substring(3,5), totalPostInMonth);
                statistics.put("totalPostInMonth01", totalPostInMonth01);
                statistics.put("totalPostInMonth02", totalPostInMonth02);
                statistics.put("totalPostInMonth03", totalPostInMonth03);
                statistics.put("totalPostInMonth04", totalPostInMonth04);
                statistics.put("totalPostInMonth05", totalPostInMonth05);
                statistics.put("totalPostInMonth06", totalPostInMonth06);
                statistics.put("totalPostInMonth07", totalPostInMonth07);
                statistics.put("totalPostInMonth08", totalPostInMonth08);
                statistics.put("totalPostInMonth09", totalPostInMonth09);
                statistics.put("totalPostInMonth10", totalPostInMonth10);
                statistics.put("totalPostInMonth11", totalPostInMonth11);
                statistics.put("totalPostInMonth12", totalPostInMonth12);

                responseData.setData(statistics);
                return new ResponseEntity<>(responseData, HttpStatus.OK);
            } else {
                responseData.setData("Only Admin");
                responseData.setStatus(403);
                responseData.setIsSuccess(false);
                return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
            }
        }
    }


