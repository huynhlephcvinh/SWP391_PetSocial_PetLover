package com.petlover.petsocial.serviceImp;

import com.petlover.petsocial.exception.PetException;
import com.petlover.petsocial.exception.PostException;
import com.petlover.petsocial.model.entity.*;
import com.petlover.petsocial.payload.request.*;
import com.petlover.petsocial.repository.PetRepository;
import com.petlover.petsocial.repository.PostRepository;
import com.petlover.petsocial.repository.UserRepository;
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
    @Autowired
    private UserRepository userRepo;

    public PostDTO insertPost(CreatPostDTO creatPostDTO, UserDTO userDTO) throws PetException {
        Post newPost = new Post();


            if(creatPostDTO.getFile()!=null) {
                Pet pet = petRepository.getById(creatPostDTO.getIdPet());
                if(pet == null) {
                    throw new PetException("Not found Pet");
                }
                System.out.println(pet);

                try {
                    String image = cloudinaryService.uploadFile(creatPostDTO.getFile());
                    newPost.setImage(image);
                }catch (Exception e){}
                if(creatPostDTO.getContent().equals("")) {
                    return null;
                }
                if(creatPostDTO.getContent()==null) {
                    return null;
                }
                newPost.setContent(creatPostDTO.getContent());
                User user = userRepo.getById(userDTO.getId());
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
                Pet pet = petRepository.getById(creatPostDTO.getIdPet());
                if(pet == null) {
                    throw new PetException("Not found Pet");
                }
                System.out.println(pet);
                newPost.setImage(null);
                if(creatPostDTO.getContent().equals("")){
                    return null;
                }
                if(creatPostDTO.getContent()==null) {
                    return null;
                }
                newPost.setContent(creatPostDTO.getContent());
                User user = userRepo.getById(userDTO.getId());
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


        PetToPostDTO petToPostDTO = new PetToPostDTO();
        petToPostDTO.setId(newPost.getPet().getId());
        petToPostDTO.setName(newPost.getPet().getName());
        petToPostDTO.setImage(newPost.getPet().getImage());


        UserPostDTO userPostDTO = new UserPostDTO();
        userPostDTO.setId(newPost.getUser().getId());
        userPostDTO.setName(newPost.getUser().getName());
        userPostDTO.setAvatar(newPost.getUser().getAvatar());

            return new PostDTO(newPost.getId(),newPost.getImage(),newPost.getContent(),newPost.getCreate_date(),newPost.getTotal_like(),newPost.getComments(),petToPostDTO,userPostDTO);

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

            PetToPostDTO petToPostDTO = new PetToPostDTO();
            petToPostDTO.setId(post.getPet().getId());
            petToPostDTO.setName(post.getPet().getName());
            petToPostDTO.setImage(post.getPet().getImage());
            postDTO.setPetToPostDTO(petToPostDTO);

            UserPostDTO userPostDTO = new UserPostDTO();
            userPostDTO.setId(post.getUser().getId());
            userPostDTO.setName(post.getUser().getName());
            userPostDTO.setAvatar(post.getUser().getAvatar());
            postDTO.setUserPostDTO(userPostDTO);

            listpostDTO.add(postDTO);
        }
        return listpostDTO;
    }
    public List<PostDTO> getAllYourPost(int idUser)
    {
        List<Post> postList = postRepository.getAllYourPost(idUser);
        List<PostDTO> listpostDTO = new ArrayList<>();
        for(Post post : postList) {
            PostDTO postDTO = new PostDTO();
            postDTO.setId(post.getId());
            postDTO.setContent(post.getContent());
            postDTO.setImage(post.getImage());
            postDTO.setCreate_date(post.getCreate_date());
            postDTO.setTotal_like(post.getTotal_like());
            postDTO.setComments(post.getComments());

            PetToPostDTO petToPostDTO = new PetToPostDTO();
            petToPostDTO.setId(post.getPet().getId());
            petToPostDTO.setName(post.getPet().getName());
            petToPostDTO.setImage(post.getPet().getImage());
            postDTO.setPetToPostDTO(petToPostDTO);

            UserPostDTO userPostDTO = new UserPostDTO();
            userPostDTO.setId(post.getUser().getId());
            userPostDTO.setName(post.getUser().getName());
            userPostDTO.setAvatar(post.getUser().getAvatar());
            postDTO.setUserPostDTO(userPostDTO);
            listpostDTO.add(postDTO);
        }
        return listpostDTO;
    }
    public List<PostDTO> sreachPost(String content)
    {
        List<Post> postListSearch = postRepository.searchPost(content);
        List<PostDTO> listpostDTO = new ArrayList<>();
        for(Post post : postListSearch) {
            PostDTO postDTO = new PostDTO();
            postDTO.setId(post.getId());
            postDTO.setContent(post.getContent());
            postDTO.setImage(post.getImage());
            postDTO.setCreate_date(post.getCreate_date());
            postDTO.setTotal_like(post.getTotal_like());
            postDTO.setComments(post.getComments());

            PetToPostDTO petToPostDTO = new PetToPostDTO();
            petToPostDTO.setId(post.getPet().getId());
            petToPostDTO.setName(post.getPet().getName());
            petToPostDTO.setImage(post.getPet().getImage());
            postDTO.setPetToPostDTO(petToPostDTO);

            UserPostDTO userPostDTO = new UserPostDTO();
            userPostDTO.setId(post.getUser().getId());
            userPostDTO.setName(post.getUser().getName());
            userPostDTO.setAvatar(post.getUser().getAvatar());
            postDTO.setUserPostDTO(userPostDTO);
            listpostDTO.add(postDTO);
        }
        return listpostDTO;
    }



    public PostDTO findById(int idPost) throws PostException{
        Post getPost = postRepository.getById(idPost);
        if(getPost == null){
            throw new PostException("Not found");
        }
        PetToPostDTO petToPostDTO = new PetToPostDTO();
        petToPostDTO.setId(getPost.getPet().getId());
        petToPostDTO.setName(getPost.getPet().getName());
        petToPostDTO.setImage(getPost.getPet().getImage());


        UserPostDTO userPostDTO = new UserPostDTO();
        userPostDTO.setId(getPost.getUser().getId());
        userPostDTO.setName(getPost.getUser().getName());
        userPostDTO.setAvatar(getPost.getUser().getAvatar());
        return new PostDTO(getPost.getId(),getPost.getImage(),getPost.getContent(),getPost.getCreate_date(),getPost.getTotal_like(),getPost.getComments(),petToPostDTO,userPostDTO);
    }
    public PostDTO deletePost(int id, UserDTO userDTO)  {

        Post getPost = postRepository.getById(id);
        if(getPost == null) {
            return null;
        }
        if(getPost.getUser().getId() == userDTO.getId()) {
           getPost.setStatus(false);
        }
        else {
            return null;
        }
        postRepository.save(getPost);
        PetToPostDTO petToPostDTO = new PetToPostDTO();
        petToPostDTO.setId(getPost.getPet().getId());
        petToPostDTO.setName(getPost.getPet().getName());
        petToPostDTO.setImage(getPost.getPet().getImage());


        UserPostDTO userPostDTO = new UserPostDTO();
        userPostDTO.setId(getPost.getUser().getId());
        userPostDTO.setName(getPost.getUser().getName());
        userPostDTO.setAvatar(getPost.getUser().getAvatar());

        return new PostDTO(getPost.getId(),getPost.getImage(),getPost.getContent(),getPost.getCreate_date(),getPost.getTotal_like(),getPost.getComments(),petToPostDTO,userPostDTO);
    }

    public PostDTO updatePost(int id, PostUpdateDTO postUpdateDTO,UserDTO userDTO)
    {
        Post getPost = postRepository.getById(id);
        if(getPost == null) {
            return null;
        }
        if(postUpdateDTO.getContent().equals("")) {
            return null;
        }
        if(getPost.getUser().getId() == userDTO.getId()) {
            getPost.setContent(postUpdateDTO.getContent());
        }else{
            return null;
        }
        postRepository.save(getPost);

        PetToPostDTO petToPostDTO = new PetToPostDTO();
        petToPostDTO.setId(getPost.getPet().getId());
        petToPostDTO.setName(getPost.getPet().getName());
        petToPostDTO.setImage(getPost.getPet().getImage());


        UserPostDTO userPostDTO = new UserPostDTO();
        userPostDTO.setId(getPost.getUser().getId());
        userPostDTO.setName(getPost.getUser().getName());
        userPostDTO.setAvatar(getPost.getUser().getAvatar());

        return new PostDTO(getPost.getId(),getPost.getImage(),getPost.getContent(),getPost.getCreate_date(),getPost.getTotal_like(),getPost.getComments(),petToPostDTO,userPostDTO);

    }






}
