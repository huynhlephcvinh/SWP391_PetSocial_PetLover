package com.petlover.petsocial.controller;


import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.model.entity.Apply;
import com.petlover.petsocial.model.entity.Exchange;
import com.petlover.petsocial.payload.request.ApplyDTO;
import com.petlover.petsocial.payload.request.UserDTO;
import com.petlover.petsocial.service.ApplyService;
import com.petlover.petsocial.service.ExchangeService;
import com.petlover.petsocial.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apply")
public class ApplyController {

    @Autowired
    private ExchangeService exchangeService;

    @Autowired
    private UserService userService;

    @Autowired
    private ApplyService applyService;

    @PostMapping("/create")
    public ResponseEntity<?> createApply (@RequestHeader("Authorization") String jwt, @RequestParam int userid, @RequestParam int id) throws UserException {
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        UserDTO userDTO1 = userService.findUserProfileById(userid);
        Exchange exchange = exchangeService.getOneExchange(userDTO1, id);
        if (exchange != null) {
            Apply apply = applyService.createApply(exchange,userDTO, userDTO1);
            return ResponseEntity.ok("Apply created successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exchange not found.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStatus(@RequestHeader("Authorization") String jwt, @PathVariable int id) throws UserException {
        UserDTO userDTO = userService.findUserProfileByJwt(jwt);
        Apply apply = applyService.updateApply(userDTO, id);
        if (apply!=null){
            ApplyDTO applyDTO = ApplyDTO.convertToDTO(apply);
            return ResponseEntity.ok(applyDTO);
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Apply not found.");
        }

    }
}
