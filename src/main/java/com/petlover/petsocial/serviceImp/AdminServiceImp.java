package com.petlover.petsocial.serviceImp;

import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.model.entity.Pet;
import com.petlover.petsocial.model.entity.Post;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.PetForAdminDTO;
import com.petlover.petsocial.payload.request.PostForAdminDTO;
import com.petlover.petsocial.payload.request.UserForAdminDTO;
import com.petlover.petsocial.payload.request.UserForAdminManager;
import com.petlover.petsocial.repository.PetRepository;
import com.petlover.petsocial.repository.PostRepository;
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
    @Autowired
    PostRepository postRepository;
    @Autowired
    PetRepository petRepository;

    @Override
    public List<UserForAdminManager> getListUserForAdmin()
    {
        List<User> listUser = userRepo.listUser();
        List<UserForAdminManager> getListUserForAdmin = new ArrayList<>();
        for(User user : listUser) {
            UserForAdminManager userForAdminDTO = new UserForAdminManager();
            userForAdminDTO.setId(user.getId());
            userForAdminDTO.setName(user.getName());
            userForAdminDTO.setAvatar(user.getAvatar());
            userForAdminDTO.setEnable(user.isEnable());
            userForAdminDTO.setEmail(user.getEmail());
            userForAdminDTO.setPhone(user.getPhone());
            userForAdminDTO.setRole(user.getRole());
            int countpet=0;
            for(int i=0;i<user.getPets().size();i++) {
                if(user.getPets().get(i).isStatus()==true) {
                    countpet++;
                }
            }
            userForAdminDTO.setTotalPet(countpet);
            int countpost=0;
            for(int y=0;y<user.getPosts().size();y++) {
                if(user.getPosts().get(y).isStatus()==true) {
                    if(user.getPosts().get(y).isEnable()==true) {
                        countpost++;
                    }
                }
            }
            userForAdminDTO.setTotalPost(countpost);
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
        int size =0;
        try {
            List<User> listUser = userRepo.listUser();
            size = listUser.size();
        }catch(Exception ex){ }
        return size;
    }
    public int getTotalPostDete() {
        int size =0;
        try {
        List<Post> listPostDelete = postRepository.getAllPostDeleteForAdmin();
        size = listPostDelete.size();
        }catch(Exception ex){ }
        return size;
    }

    public int getTotalPostDisplay() {
        int size =0;
        try {
            List<Post> listPostDisplay = postRepository.getAllPostDisplayUserForAdmin();
            size = listPostDisplay.size();
        }catch(Exception ex){ }
        return size;
    }
    public int getTotalPetDisplay() {
        int size =0;
        try {
            List<Pet> listPetDisplay = petRepository.getAllPetDisplayForAdmin();
            size = listPetDisplay.size();
        }catch(Exception ex){ }
        return size;
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


    public List<PostForAdminDTO> listAllPost() {
        List<Post> listPost = postRepository.getAllPostForAdmin();
        List<PostForAdminDTO> postForAdminDTOS = new ArrayList<>();
        for(Post post : listPost) {
            PostForAdminDTO postDTO = new PostForAdminDTO();
            postDTO.setId(post.getId());
            postDTO.setContent(post.getContent());
            postDTO.setImage(post.getImage());
            postDTO.setCreate_date(post.getCreate_date());
            postDTO.setTotal_like(post.getTotal_like());
            postDTO.setUser_name(post.getUser().getName());
            postDTO.setStatus(post.isStatus());
            postDTO.setEnable(post.isEnable());
            postForAdminDTOS.add(postDTO);
        }
        return postForAdminDTOS;
    }

    public List<PetForAdminDTO> listAllPet() {
        List<Pet> listPet = petRepository.getAllPetForAdmin();
        List<PetForAdminDTO> petForAdminDTOS = new ArrayList<>();
        for(Pet pet : listPet) {
            PetForAdminDTO petForAdminDTO = new PetForAdminDTO();
            petForAdminDTO.setId(pet.getId());
            petForAdminDTO.setName(pet.getName());
            petForAdminDTO.setDescription(pet.getDescription());
            petForAdminDTO.setImage(pet.getImage());
            petForAdminDTO.setPetType_name(pet.getPet_type().getName());
            petForAdminDTO.setUser_name(pet.getUser().getName());
            petForAdminDTO.setStatus(pet.isStatus());
            petForAdminDTOS.add(petForAdminDTO);
        }
        return petForAdminDTOS;
    }


}
