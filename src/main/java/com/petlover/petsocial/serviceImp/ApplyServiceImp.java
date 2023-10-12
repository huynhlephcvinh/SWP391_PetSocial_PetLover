package com.petlover.petsocial.serviceImp;

import com.petlover.petsocial.model.entity.Apply;
import com.petlover.petsocial.model.entity.Exchange;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.ApplyDTO;
import com.petlover.petsocial.payload.request.UserDTO;
import com.petlover.petsocial.repository.ApplyRepository;
import com.petlover.petsocial.repository.ExchangeRepository;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.ApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ApplyServiceImp implements ApplyService {



    @Autowired
    private ExchangeRepository exchangeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApplyRepository applyRepository;

    @Override
    public Apply createApply(Exchange exchange, UserDTO userDTO, UserDTO userDTOown) {
        User user = userRepository.findById(userDTO.getId());
        User userown = userRepository.findById(userDTOown.getId());
        Exchange exchange1 = exchangeRepository.findById(exchange.getId());
        if (exchange1 != null && exchange1.getUser().getId()==userown.getId()){
            Apply apply = new Apply();
            apply.setExchange(exchange1);
            apply.setApply_date(new Date());
            apply.setUser(user);
            apply.setStatus(false);
            applyRepository.save(apply);
            return apply;
        }else {
            return null;
        }
    }

    @Override
    public Apply updateApply(UserDTO userDTO, int applyid) {
        User user = userRepository.findById(userDTO.getId());
        Apply apply = applyRepository.findById(applyid);
        if(apply!=null){
            for(Apply apply1 : user.getApplies()){
                if (!apply1.isStatus() && apply1.getId()==apply.getId()){
                    apply.setStatus(true);
                    applyRepository.save(apply);
                }
            }
            return apply;
        }else {
            return null;
        }
    }



    @Override
    public List<ApplyDTO> getApplyForExchange(UserDTO userDTO, int id) {
        User user = userRepository.findById(userDTO.getId());
        Exchange exchange = exchangeRepository.findById(id);
        List<ApplyDTO> applyDTOS = new ArrayList<>();
        if (exchange!=null && user.getExchanges().contains(exchange)){
             for (Apply apply : exchange.getApplies()){
                 ApplyDTO applyDTO = ApplyDTO.convertToDTO(apply);
                 applyDTOS.add(applyDTO);
             }
             return applyDTOS;

        }else {
            return null;
        }

    }

    @Override
    public List<Apply> getApplyForUser(UserDTO userDTO, Exchange exchange) {
        return null;
    }

    @Override
    public Apply getApplyById(int appId) {
        return applyRepository.findById(appId);
    }
}
