package com.petlover.petsocial.serviceImp;


import com.petlover.petsocial.model.entity.Comment;
import com.petlover.petsocial.model.entity.Post;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.CommentDTO;
import com.petlover.petsocial.repository.CommentRepository;
import com.petlover.petsocial.repository.PostRepository;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.CommentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
                    dto.setUserId(c.getUser().getId());
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
        dto.setUserId(comment.getUser().getId());
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

        return new CommentDTO(comment.getId(),comment.getContent(),comment.getMedia(),comment.getUser().getId(),comment.getPost().getId(),comment.getCreatedTime());
    }


    public CommentDTO updateComment(Long id, CommentDTO commentDTO) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Comment not found"));

        comment.setContent(commentDTO.getContent());
        comment.setMedia(commentDTO.getMedia());
        commentRepository.save(comment);

        return new CommentDTO(comment.getId(),comment.getContent(),comment.getMedia(),comment.getUser().getId(),comment.getPost().getId(),comment.getCreatedTime());
    }


    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
        commentRepository.delete(comment);
    }

}
