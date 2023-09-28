package com.petlover.petsocial.service;

import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.PostDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    public void insertPet(MultipartFile file, String content, User user, int petId);
    public List<PostDTO> getAllPost();
}
