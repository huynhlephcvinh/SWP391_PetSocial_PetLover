package com.petlover.petsocial.serviceImp;

import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.UserForAdminDTO;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.AdminService;
import com.petlover.petsocial.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class AdminServiceImp implements AdminService {
    @Autowired
    UserRepository userRepo;
    @Autowired
    UserService userService;

    @Override
    public List<UserForAdminDTO> getListUserForAdmin()
    {
        List<User> listUser = userRepo.listUser();
        List<UserForAdminDTO> getListUserForAdmin = new ArrayList<>();
        for(User user : listUser) {
            UserForAdminDTO userForAdminDTO = new UserForAdminDTO();
            userForAdminDTO.setId(user.getId());
            userForAdminDTO.setName(user.getName());
            userForAdminDTO.setAvatar(user.getAvatar());
            userForAdminDTO.setEnable(user.isEnable());
            userForAdminDTO.setEmail(user.getEmail());
            userForAdminDTO.setPhone(user.getPhone());
            userForAdminDTO.setRole(user.getRole());
            getListUserForAdmin.add(userForAdminDTO);
        }
        return getListUserForAdmin;
    }

    public UserForAdminDTO getBlockUser(int idUser) throws UserException {
        User user = userRepo.getById(idUser);
        if(user ==null) {
            throw new UserException("Not found User");
        }
        if(user.isEnable()==false){
            throw new UserException("User are blocked");
        }
        user.setEnable(false);
        userRepo.save(user);
        UserForAdminDTO userForAdminDTO = new UserForAdminDTO();
        userForAdminDTO.setId(user.getId());
        userForAdminDTO.setName(user.getName());
        userForAdminDTO.setAvatar(user.getAvatar());
        userForAdminDTO.setEnable(user.isEnable());
        userForAdminDTO.setEmail(user.getEmail());
        userForAdminDTO.setPhone(user.getPhone());
        userForAdminDTO.setRole(user.getRole());
        return userForAdminDTO;
    }

    public UserForAdminDTO getOffBlockUser(int idUser) throws UserException {
        User user = userRepo.getById(idUser);
        if(user ==null) {
            throw new UserException("Not found User");
        }
        if(user.isEnable()==true){
            throw new UserException("User not block");
        }
        user.setEnable(true);
        userRepo.save(user);
        UserForAdminDTO userForAdminDTO = new UserForAdminDTO();
        userForAdminDTO.setId(user.getId());
        userForAdminDTO.setName(user.getName());
        userForAdminDTO.setAvatar(user.getAvatar());
        userForAdminDTO.setEnable(user.isEnable());
        userForAdminDTO.setEmail(user.getEmail());
        userForAdminDTO.setPhone(user.getPhone());
        userForAdminDTO.setRole(user.getRole());
        return userForAdminDTO;
    }

    public int getTotalUser() {
        List<User> listUser = userRepo.listUser();
        return listUser.size();
    }

    public List<UserForAdminDTO> searchUser(String name) {
        List<User> listUser = userRepo.listUser();
        List<UserForAdminDTO> getListUserForAdmin = new ArrayList<>();
        for(User user : listUser) {
            if(user.getName().toLowerCase().contains(name.toLowerCase())){
                UserForAdminDTO userForAdminDTO = new UserForAdminDTO();
                userForAdminDTO.setId(user.getId());
                userForAdminDTO.setName(user.getName());
                userForAdminDTO.setAvatar(user.getAvatar());
                userForAdminDTO.setEnable(user.isEnable());
                userForAdminDTO.setEmail(user.getEmail());
                userForAdminDTO.setPhone(user.getPhone());
                userForAdminDTO.setRole(user.getRole());
                getListUserForAdmin.add(userForAdminDTO);
            }
        }
        return getListUserForAdmin;
    }


}
