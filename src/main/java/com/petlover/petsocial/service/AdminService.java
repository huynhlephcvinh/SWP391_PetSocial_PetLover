package com.petlover.petsocial.service;

import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.payload.request.PetForAdminDTO;
import com.petlover.petsocial.payload.request.PostForAdminDTO;
import com.petlover.petsocial.payload.request.UserForAdminDTO;
import com.petlover.petsocial.payload.request.UserForAdminManager;

import java.util.List;

public interface AdminService {
    public List<UserForAdminManager> getListUserForAdmin();
    public UserForAdminDTO getBlockUser(int idUser) throws UserException;
    public UserForAdminDTO getOffBlockUser(int idUser) throws UserException;
    public int getTotalUser();
    public List<UserForAdminDTO> searchUser(String name);
    public List<PostForAdminDTO> listAllPost();
    public List<PetForAdminDTO> listAllPet();
    public int getTotalPostDete();
    public int getTotalPostDisplay();
    public int getTotalPetDisplay();
}
