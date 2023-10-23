package com.petlover.petsocial.service;

import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.payload.request.UserForAdminDTO;

import java.util.List;

public interface AdminService {
    public List<UserForAdminDTO> getListUserForAdmin();
    public UserForAdminDTO getBlockUser(int idUser) throws UserException;
    public UserForAdminDTO getOffBlockUser(int idUser) throws UserException;
    public int getTotalUser();
    public List<UserForAdminDTO> searchUser(String name);
}
