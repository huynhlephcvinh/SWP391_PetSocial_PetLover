package com.petlover.petsocial.serviceImp;

import com.petlover.petsocial.model.entity.ExStatus;
import com.petlover.petsocial.model.entity.Exchange;
import com.petlover.petsocial.model.entity.Pet;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.ExchangeDTO;
import com.petlover.petsocial.payload.request.UserDTO;
import com.petlover.petsocial.repository.ExchangeRepository;
import com.petlover.petsocial.repository.PetRepository;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.ExchangeService;
import com.petlover.petsocial.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ExchangeServiceImp implements ExchangeService {

    @Autowired
    private ExchangeRepository exchangeRepository;

    @Autowired
    private PetService petService;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    UserRepository userRepository;


    @Override
    public ExchangeDTO addExchange(UserDTO userDTO, Long petId, int paymentAmount) {
        Exchange exchange = new Exchange();
        User user = userRepository.findById(userDTO.getId()).orElse(null);
        Pet pet = petRepository.getById(petId);
        if (user != null && pet != null) {
            exchange.setUser(user);
            exchange.setPet(pet);
            exchange.setExchange_date(new Date());
            exchange.setPayment_amount(paymentAmount);
            exchange.setStatus(ExStatus.PENDING);
            exchangeRepository.save(exchange);
            return convertToDTO(exchange);
        } else {
            return null;
        }
    }

    @Override
    public ExchangeDTO deleteExchange(UserDTO userDTO,Long id) {
        Exchange exchange = exchangeRepository.findById(id).orElse(null);
        User user = userRepository.findById(userDTO.getId()).orElse(null);
        if (exchange != null && exchange.getUser().getId()==user.getId()) {
            exchange.setStatus(ExStatus.REMOVED);
            exchangeRepository.save(exchange);
            return convertToDTO(exchange);
        } else {
            return null;

        }
    }
    @Override
    public List<ExchangeDTO> getAllExchangeToShow() {
        List<ExchangeDTO> exchangeDTOList = new ArrayList<>();
        for (Exchange exchange : exchangeRepository.getAllExchange()) {
            ExchangeDTO exchangeDTO = convertToDTO(exchange);
            exchangeDTOList.add(exchangeDTO);
        }
        return exchangeDTOList;
    }
    @Override
    public ExchangeDTO updateExchange(UserDTO userDTO,Long id) {
        Exchange exchange = exchangeRepository.findById(id).orElse(null);
        User user = userRepository.findById(userDTO.getId()).orElse(null);
        if (exchange != null && exchange.getUser().getId()==user.getId()) {
            exchange.setStatus(ExStatus.COMPLETED);
            exchangeRepository.save(exchange);
            return convertToDTO(exchange);
        } else {
            return null;

        }
    }

    @Override
    public ExchangeDTO editCashExchange(UserDTO userDTO, Long id, int paymentAmount) {
        Exchange exchange = exchangeRepository.findById(id).orElse(null);
        User user = userRepository.findById(userDTO.getId()).orElse(null);

        if(paymentAmount>0 && exchange.getUser().getId()==user.getId()){
            exchange.setPayment_amount(paymentAmount);
            exchangeRepository.save(exchange);
            return convertToDTO(exchange);
        }else {
            return null;

        }
    }

    @Override
    public List<ExchangeDTO> getAllExchangeDTO(UserDTO userDTO) {
        List<ExchangeDTO> exchangeList = new ArrayList<>();
        User user = userRepository.findById(userDTO.getId()).orElse(null);
        if (user != null) {
            for (Exchange exchange : user.getExchanges()){
                ExchangeDTO exchangeDTO = convertToDTO(exchange);
                exchangeList.add(exchangeDTO);
            }
            return exchangeList;
        } else {
            return null;
        }

    }

    @Override
    public List<ExchangeDTO> getAllRemovedExchangeDTO(UserDTO userDTO) {
        List<Exchange> exchangeList = new ArrayList<>();
        User user = userRepository.findById(userDTO.getId()).orElse(null);
        if (user != null) {
            exchangeList = user.getExchanges();
            List<ExchangeDTO> exchangeList1 = new ArrayList<>();
            for (Exchange exchange : exchangeList) {
                if (exchange.getStatus().equals(ExStatus.REMOVED)) {
                    ExchangeDTO exchangeDTO = convertToDTO(exchange);
                    exchangeList1.add(exchangeDTO);
                }
            }
            return exchangeList1;
        } else {
            return null;
        }
    }

    @Override
    public List<ExchangeDTO> getAllNotRemovedExchangeDTO(UserDTO userDTO) {
        List<Exchange> exchangeList = new ArrayList<>();
        User user = userRepository.findById(userDTO.getId()).orElse(null);
        if (user != null) {
            exchangeList = user.getExchanges();
            List<ExchangeDTO> exchangeList1 = new ArrayList<>();
            for (Exchange exchange : exchangeList) {
                if (!exchange.getStatus().equals(ExStatus.REMOVED)) {
                    ExchangeDTO exchangeDTO = convertToDTO(exchange);
                    exchangeList1.add(exchangeDTO);
                }
            }
            return exchangeList1;
        } else {
            return null;
        }
    }

    @Override
    public List<Exchange> getAllExchange(UserDTO userDTO) {
        List<Exchange> exchangeList = new ArrayList<>();
        User user = userRepository.findById(userDTO.getId()).orElse(null);
        if (user != null) {
            exchangeList = user.getExchanges();
            return exchangeList;
        } else {
            return null;
        }

    }

    @Override
    public List<Exchange> getAllRemovedExchange(UserDTO userDTO) {
        List<Exchange> exchangeList = new ArrayList<>();
        User user = userRepository.findById(userDTO.getId()).orElse(null);
        if (user != null) {
            exchangeList = user.getExchanges();
            List<Exchange> exchangeList1 = new ArrayList<>();
            for (Exchange exchange : exchangeList) {
                if (exchange.getStatus().equals(ExStatus.REMOVED)) {
                    exchangeList1.add(exchange);
                }
            }
            return exchangeList1;
        } else {
            return null;
        }
    }

    @Override
    public List<Exchange> getAllNotRemovedExchange(UserDTO userDTO) {
        List<Exchange> exchangeList = new ArrayList<>();
        User user = userRepository.findById(userDTO.getId()).orElse(null);
        if (user != null) {
            exchangeList = user.getExchanges();
            List<Exchange> exchangeList1 = new ArrayList<>();
            for (Exchange exchange : exchangeList) {
                if (!exchange.getStatus().equals(ExStatus.REMOVED)) {
                    exchangeList1.add(exchange);
                }
            }
            return exchangeList1;
        } else {
            return null;
        }
    }

    @Override
    public ExchangeDTO getOneExchangeDTO(UserDTO userDTO,Long id) {
        User user = userRepository.findById(userDTO.getId()).orElse(null);
        Exchange exchange = exchangeRepository.findById(id).orElse(null);
        if(user.getId()==exchange.getUser().getId() && !exchange.getStatus().equals(ExStatus.REMOVED)){
            return convertToDTO(exchange);
        }
        else {
            return null;
        }

    }

    @Override
    public Exchange getOneExchange(UserDTO userDTO, Long id) {
        User user = userRepository.findById(userDTO.getId()).orElse(null);
        Exchange exchange = exchangeRepository.findById(id).orElse(null);
        if(user.getId()==exchange.getUser().getId()){
            return exchange;
        }
        else {
            return null;
        }
    }


    private ExchangeDTO convertToDTO(Exchange exchange) {
        ExchangeDTO exchangeDTO = new ExchangeDTO();
        exchangeDTO.setId(exchange.getId());
        exchangeDTO.setExchangeDate(exchange.getExchange_date());
        exchangeDTO.setPaymentAmount(exchange.getPayment_amount());
        exchangeDTO.setStatus(exchange.getStatus());
        exchangeDTO.setUserId(exchange.getUser().getId());
        exchangeDTO.setPetId(exchange.getPet().getId());
        return exchangeDTO;
    }

}
