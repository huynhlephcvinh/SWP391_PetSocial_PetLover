package com.petlover.petsocial.service;

import com.petlover.petsocial.exception.PostException;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.CreatPostDTO;
import com.petlover.petsocial.payload.request.PostDTO;
import com.petlover.petsocial.payload.request.PostUpdateDTO;
import com.petlover.petsocial.payload.request.UserDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    public PostDTO insertPost(CreatPostDTO creatPostDTO, UserDTO userDTO);
    public List<PostDTO> getAllPost();
    public List<PostDTO> getAllYourPost(int idUser);
    public PostDTO deletePost(int id, UserDTO userDTO);
    public PostDTO updatePost(int id, PostUpdateDTO postUpdateDTO,UserDTO userDTO);
    public PostDTO findById(int idPost) throws PostException;
}
