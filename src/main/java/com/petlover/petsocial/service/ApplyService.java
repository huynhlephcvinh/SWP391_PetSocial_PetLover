package com.petlover.petsocial.service;

import com.petlover.petsocial.model.entity.Apply;
import com.petlover.petsocial.model.entity.Exchange;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.ApplyDTO;
import com.petlover.petsocial.payload.request.UserDTO;

import java.util.List;

public interface ApplyService {
    public Apply createApply(Exchange exchange, UserDTO userDTO, UserDTO userDTOown);
    public Apply updateApply(UserDTO userDTO, int applyid);
    //public Apply deleteApply(UserDTO userDTO, int applyid);
    public List<ApplyDTO> getApplyForExchange(UserDTO userDTO, int id);
    public List<Apply> getApplyForUser(UserDTO userDTO, Exchange exchange );
    public Apply getApplyById(int appId);

}
