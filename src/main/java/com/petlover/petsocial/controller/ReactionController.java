package com.petlover.petsocial.controller;

import com.petlover.petsocial.exception.PostException;
import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.payload.request.ReactionDTO;
import com.petlover.petsocial.payload.request.UserDTO;
import com.petlover.petsocial.payload.response.ResponseData;
import com.petlover.petsocial.service.ReactionService;
import com.petlover.petsocial.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reaction")
public class ReactionController {

    @Autowired
    UserService userService;
    @Autowired
    ReactionService reactionService;

    @PostMapping("/{idPost}/like")
    public ResponseEntity<?> reactionPost(@PathVariable int idPost, @RequestHeader("Authorization") String jwt) throws UserException, PostException {
        ResponseData responseData = new ResponseData();
            UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        ReactionDTO reactionDTO = reactionService.reactionPost(idPost,userDTO);
        responseData.setData(reactionDTO);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


}
