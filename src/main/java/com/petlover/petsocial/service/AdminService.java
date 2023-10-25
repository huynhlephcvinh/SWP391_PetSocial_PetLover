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
    public int getTotalPostDisplayInMonth();
    public int getTotalPostDisplayInMonth01();
    public int getTotalPostDisplayInMonth02();
    public int getTotalPostDisplayInMonth03();
    public int getTotalPostDisplayInMonth04();
    public int getTotalPostDisplayInMonth05();
    public int getTotalPostDisplayInMonth06();
    public int getTotalPostDisplayInMonth07();
    public int getTotalPostDisplayInMonth08();
    public int getTotalPostDisplayInMonth09();
    public int getTotalPostDisplayInMonth10();
    public int getTotalPostDisplayInMonth11();
    public int getTotalPostDisplayInMonth12();
}
