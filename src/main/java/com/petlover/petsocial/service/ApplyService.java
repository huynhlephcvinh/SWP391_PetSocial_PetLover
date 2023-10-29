package com.petlover.petsocial.service;

import com.petlover.petsocial.model.entity.Apply;
import com.petlover.petsocial.model.entity.Exchange;
import com.petlover.petsocial.payload.request.ApplyDTO;
import com.petlover.petsocial.payload.request.UserDTO;

import java.util.List;

public interface ApplyService {
    Apply createApply(Exchange exchange, UserDTO userDTO, UserDTO userDTOown);
    Apply updateApply(UserDTO userDTO, Long applyid);
    //public Apply deleteApply(UserDTO userDTO, int applyid);
    List<ApplyDTO> getApplyForExchange(UserDTO userDTO, Long id);
    List<Apply> getApplyForUser(UserDTO userDTO, Exchange exchange );
    Apply getApplyById(Long appId);

}
