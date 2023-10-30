package com.petlover.petsocial.serviceImp;


import com.petlover.petsocial.model.entity.Comment;
import com.petlover.petsocial.model.entity.Pet;
import com.petlover.petsocial.model.entity.Post;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.*;
import com.petlover.petsocial.repository.CommentRepository;
import com.petlover.petsocial.repository.PostRepository;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.CommentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImp implements CommentService {


    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;
    public List<CommentDTO> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);

        // Convert to DTO
        return comments.stream()
                .map(c -> {
                    CommentDTO dto = new CommentDTO();
                    dto.setId(c.getId());
                    dto.setContent(c.getContent());
                    dto.setMedia(c.getMedia());
                    dto.setUserDTO(this.convertUserToDTO(c.getUser()));
                    dto.setPostId(c.getPost().getId());
                    dto.setCreatedTime(c.getCreatedTime());
                    return dto;
                })
                .collect(Collectors.toList());
    }
    public CommentDTO getCommentById(Long id) {

        // Fetch comment entity
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));

        // Map to DTO
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setMedia(comment.getMedia());
        dto.setUserDTO(this.convertUserToDTO(comment.getUser()));
        dto.setPostId(comment.getPost().getId());
        dto.setCreatedTime(comment.getCreatedTime());

        return dto;

    }

    public CommentDTO createComment(Long userId, Long postId, CommentDTO commentDTO) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found"));

        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setMedia(commentDTO.getMedia());
        comment.setUser(user);
        comment.setPost(post);
        comment.setCreatedTime(LocalDateTime.now());

        commentRepository.save(comment);

        return new CommentDTO(comment.getId(),comment.getContent(),comment.getMedia(),this.convertUserToDTO(comment.getUser()),comment.getPost().getId(),comment.getCreatedTime());
    }


    public CommentDTO updateComment(Long id, CommentDTO commentDTO) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Comment not found"));

        comment.setContent(commentDTO.getContent());
        comment.setMedia(commentDTO.getMedia());
        commentRepository.save(comment);

        return new CommentDTO(comment.getId(),comment.getContent(),comment.getMedia(),this.convertUserToDTO(comment.getUser()),comment.getPost().getId(),comment.getCreatedTime());
    }


    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
        commentRepository.delete(comment);
    }

    public List<PostDTO> convertPostListToDTOs(List<Post> postList) {
        List<PostDTO> postDTOList = new ArrayList<>();
        for(Post post: postList){
            if(post.isStatus()) {
                if(post.isEnable()) {
                    PetToPostDTO petToPostDTO = new PetToPostDTO();
                    petToPostDTO.setId(post.getPet().getId());
                    petToPostDTO.setName(post.getPet().getName());
                    petToPostDTO.setImage(post.getPet().getImage());


                    UserPostDTO userPostDTO = new UserPostDTO();
                    userPostDTO.setId(post.getUser().getId());
                    userPostDTO.setName(post.getUser().getName());
                    userPostDTO.setAvatar(post.getUser().getAvatar());

                    PostDTO postDTO = new PostDTO(post.getId(), post.getImage(), post.getContent(), post.getCreate_date(), post.getTotal_like(), this.convertCommentListToDTO(post.getComments()), petToPostDTO, userPostDTO);
                    postDTOList.add(postDTO);
                }
            }
        }
        return postDTOList;
    }
    public List<PetDTO> convertPetListToDTOs(List<Pet> petList) {
        List<PetDTO> petDTOList = new ArrayList<>();
        for(Pet pet: petList){
            if(pet.isStatus()) {
                PetDTO petDTO = new PetDTO();
                petDTO.setId(pet.getId());
                petDTO.setName(pet.getName());
                petDTO.setImage(pet.getImage());
                petDTO.setDescription(pet.getDescription());
                petDTOList.add(petDTO);
            }
        }
        return petDTOList;
    }
    public UserDTO convertUserToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setPhone(user.getPhone());
        userDTO.setEmail(user.getEmail());
        userDTO.setAvatar(user.getAvatar());
        userDTO.setPostDTOList(this.convertPostListToDTOs(user.getPosts()));
        userDTO.setRole(user.getRole());
        userDTO.setPetDTOList(this.convertPetListToDTOs(user.getPets()));
        return userDTO;
    }
    public CommentDTO convertCommentToDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setContent(comment.getContent());
        commentDTO.setMedia(comment.getMedia());
        commentDTO.setUserDTO(this.convertUserToDTO(comment.getUser()));
        commentDTO.setPostId(comment.getPost().getId());
        commentDTO.setCreatedTime(comment.getCreatedTime());
        return commentDTO;
    }

    public List<CommentDTO> convertCommentListToDTO(List<Comment> commentList) {
        if (commentList == null) {
            return new ArrayList<>(); // return an empty list if commentList is null
        }
        return commentList.stream().map(this::convertCommentToDTO).collect(Collectors.toList());
    }
}
