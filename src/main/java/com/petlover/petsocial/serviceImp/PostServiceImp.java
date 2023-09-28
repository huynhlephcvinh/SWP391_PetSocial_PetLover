package com.petlover.petsocial.serviceImp;

import com.petlover.petsocial.model.entity.*;
import com.petlover.petsocial.payload.request.PetToPostDTO;
import com.petlover.petsocial.payload.request.PostDTO;
import com.petlover.petsocial.repository.PetRepository;
import com.petlover.petsocial.repository.PostRepository;
import com.petlover.petsocial.service.CloudinaryService;
import com.petlover.petsocial.service.PostService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.text.DateFormat;
import java.util.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;

@Service
public class PostServiceImp implements PostService {
    @Autowired
    CloudinaryService cloudinaryService;
    @Autowired
    PetRepository petRepository;
    @Autowired
    HttpSession session;
    @Autowired
    PostRepository postRepository;

    public void insertPet(MultipartFile file, String content, User user, int petId) {

        try {
            if(!Objects.requireNonNull(file.getOriginalFilename()).isEmpty()) {
                String image = cloudinaryService.uploadFile(file);
                Pet pet = petRepository.getById(petId);
                System.out.println(pet);
                Post newPost = new Post();
                newPost.setImage(image);
                newPost.setContent(content);
                newPost.setUser(user);
                newPost.setPet(pet);
                newPost.setStatus(true);
                Calendar cal = Calendar.getInstance();
                Date date = cal.getTime();
                DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm");
                String formattedDate = dateFormat.format(date);
                newPost.setCreate_date(formattedDate);
                newPost.setEnable(true);
                newPost.setTotal_like(0);
                postRepository.save(newPost);

            }else {
                Pet pet = petRepository.getById(petId);
                System.out.println(pet);
                Post newPost = new Post();
                newPost.setImage(null);
                newPost.setContent(content);
                newPost.setUser(user);
                newPost.setPet(pet);
                newPost.setStatus(true);
                Calendar cal = Calendar.getInstance();
                Date date = cal.getTime();
                DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm");
                String formattedDate = dateFormat.format(date);
                newPost.setCreate_date(formattedDate);
                newPost.setEnable(false);
                newPost.setTotal_like(0);
                postRepository.save(newPost);

            }
        } catch (Exception e) {
            System.out.println("Err insert restaurant: " + e.getMessage());
        }

    }

    public List<PostDTO> getAllPost()
    {
        List<Post> postList = postRepository.getAll();
        List<PostDTO> listpostDTO = new ArrayList<>();
        for(Post post : postList) {
            PostDTO postDTO = new PostDTO();
            postDTO.setId(post.getId());
            postDTO.setContent(post.getContent());
            postDTO.setImage(post.getImage());
            postDTO.setCreate_date(post.getCreate_date());
            postDTO.setTotal_like(post.getTotal_like());
            postDTO.setComments(post.getComments());
            listpostDTO.add(postDTO);
        }
        return listpostDTO;
    }
}
