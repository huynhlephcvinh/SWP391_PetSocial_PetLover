package com.petlover.petsocial.service;

import com.petlover.petsocial.model.entity.Exchange;
import com.petlover.petsocial.payload.request.ExchangeDTO;
import com.petlover.petsocial.payload.request.UserDTO;


import java.util.List;


public interface ExchangeService {

    public ExchangeDTO addExchange(UserDTO userDTO, Long petId, int paymentAmount);

    public ExchangeDTO deleteExchange(UserDTO userDTO,Long id);

    public ExchangeDTO updateExchange(UserDTO userDTO,Long id);
    public ExchangeDTO editCashExchange(UserDTO userDTO,Long id, int paymentAmount);

    public List<ExchangeDTO> getAllExchangeDTO(UserDTO userDTO);
    public List<ExchangeDTO> getAllRemovedExchangeDTO(UserDTO userDTO);
    public List<ExchangeDTO> getAllNotRemovedExchangeDTO(UserDTO userDTO);

    public List<Exchange> getAllExchange(UserDTO userDTO);
    public List<Exchange> getAllRemovedExchange(UserDTO userDTO);
    public List<Exchange> getAllNotRemovedExchange(UserDTO userDTO);


    public List<ExchangeDTO> getAllExchangeToShow();
    public ExchangeDTO getOneExchangeDTO(UserDTO userDTO,Long id);

    public Exchange getOneExchange(UserDTO userDTO,Long id);
}
