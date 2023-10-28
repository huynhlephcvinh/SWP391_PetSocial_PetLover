package com.petlover.petsocial.serviceImp;

import com.petlover.petsocial.exception.PostException;
import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.model.entity.Comment;
import com.petlover.petsocial.model.entity.Post;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.CommentDTO;
import com.petlover.petsocial.repository.CommentRepository;
import com.petlover.petsocial.repository.PostRepository;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImp implements CommentService {


    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }
    public Comment getCommentById(Long id) {
        return commentRepository.findById(id).orElse(null);
    }

    public Comment createComment(Long userId, Long postId, CommentDTO commentDTO) {
        User user = userRepository.findById(userId).orElse(null);
        Post post = postRepository.findById(postId).orElse(null);
        if (user != null && post != null) {
            Comment comment = new Comment();
            comment.setContent(commentDTO.getContent());
            comment.setMedia(commentDTO.getMedia());
            comment.setUser(user);
            comment.setPost(post);
            return commentRepository.save(comment);
        }
        return null;
    }

    public Comment updateComment(Long id, CommentDTO commentDTO) {
        Comment comment = getCommentById(id);
        if (comment != null) {
            comment.setContent(commentDTO.getContent());
            comment.setMedia(commentDTO.getMedia());
            return commentRepository.save(comment);
        }
        return null;
    }

    public void deleteComment(Long userId, Long postId) {
        List<Comment> comments = getCommentsByPostId(postId);
        comments.stream()
                .filter(comment -> comment.getUser().getId().equals(userId))
                .forEach(comment -> commentRepository.delete(comment));
    }
}
