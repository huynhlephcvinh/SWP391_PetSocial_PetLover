package com.petlover.petsocial.serviceImp;

import com.petlover.petsocial.exception.PostException;
import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.model.entity.Pet;
import com.petlover.petsocial.model.entity.Post;
import com.petlover.petsocial.model.entity.Reaction;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.*;
import com.petlover.petsocial.repository.PostRepository;
import com.petlover.petsocial.repository.ReactionRepository;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.PostService;
import com.petlover.petsocial.service.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReactionServiceImp implements ReactionService {

   @Autowired
    ReactionRepository reactionRepository;
   @Autowired
    PostRepository postRepository;
   @Autowired
    PostService postService;
    @Autowired
    UserRepository userRepository;

   public ReactionDTO reactionPost(int idPost, UserDTO userDTO) throws UserException, PostException {
       Reaction isReactionExist = reactionRepository.isReactionExist(userDTO.getId(),idPost);
       if(isReactionExist!=null) {

           reactionRepository.deleteById(isReactionExist.getId());
           Post post = postRepository.getById(idPost);
           int countReaction = getAllReaction(idPost).size();
           post.setTotal_like(countReaction);
           postRepository.save(post);
           PostDTO postDTO = postService.findById(idPost);
           return new ReactionDTO(isReactionExist.getId(),userDTO,postDTO);
       }

       Post post = postRepository.getById(idPost);
       User user = userRepository.getById(userDTO.getId());
       Reaction reaction = new Reaction();
       reaction.setActive(true);
       reaction.setUser(user);
       reaction.setPost(post);
       Reaction saveReaction = reactionRepository.save(reaction);

       post.getReactions().add(saveReaction);
       int countReaction = getAllReaction(idPost).size();
       post.setTotal_like(countReaction);
       postRepository.save(post);
       PostDTO postDTO = postService.findById(idPost);
         return new ReactionDTO(saveReaction.getId(),userDTO,postDTO);
   }

   public List<ReactionDTO> getAllReaction(int idPost) throws PostException {
       PostDTO postDTO = postService.findById(idPost);
       List<Reaction> reactionList = reactionRepository.findByPostId(idPost);
        List<ReactionDTO> reactionDTOList = new ArrayList<>();
        for(Reaction reaction : reactionList){
            ReactionDTO reactionDTO = new ReactionDTO();
            reactionDTO.setId(reaction.getId());

            List<PostDTO> postDTOList = new ArrayList<>();
            for(Post post: reaction.getUser().getPosts()){
                PetToPostDTO petToPostDTO = new PetToPostDTO();
                petToPostDTO.setId(post.getPet().getId());
                petToPostDTO.setName(post.getPet().getName());
                petToPostDTO.setImage(post.getPet().getImage());


                UserPostDTO userPostDTO = new UserPostDTO();
                userPostDTO.setId(post.getUser().getId());
                userPostDTO.setName(post.getUser().getName());
                userPostDTO.setAvatar(post.getUser().getAvatar());

                PostDTO postDTO2 = new PostDTO(post.getId(),post.getImage(),post.getContent(),post.getCreate_date(),post.getTotal_like(),post.getComments(),petToPostDTO,userPostDTO);
                postDTOList.add(postDTO2);
            }

            List<PetDTO> petDTOList =new ArrayList<>();
            for(Pet pet: reaction.getUser().getPets()){
                PetDTO petDTO = new PetDTO(pet.getId(),pet.getImage(),pet.getName(),pet.getDescription());
                petDTOList.add(petDTO);
            }

            UserDTO userDTO = new UserDTO(reaction.getUser().getId(),reaction.getUser().getName(),reaction.getUser().getEmail(),reaction.getUser().getPhone(),reaction.getUser().getAvatar(),petDTOList,postDTOList);
            reactionDTO.setUserDTO(userDTO);
            PostDTO postDTO1 = postService.findById(idPost);
            reactionDTO.setPostDTO(postDTO1);
            reactionDTOList.add(reactionDTO);
        }
        return reactionDTOList;
   }

}
