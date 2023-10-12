package com.petlover.petsocial.service;

import com.petlover.petsocial.exception.PostException;
import com.petlover.petsocial.payload.request.PostDTO;

import java.util.List;

public interface StaffService {
    public List<PostDTO> getAllPostDisable();
    public PostDTO getEnablePost(int idPost) throws PostException;
}
