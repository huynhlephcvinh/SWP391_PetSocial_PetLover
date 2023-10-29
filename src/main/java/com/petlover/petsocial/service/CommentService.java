package com.petlover.petsocial.service;

import com.petlover.petsocial.exception.PostException;
import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.model.entity.Comment;
import com.petlover.petsocial.payload.request.CommentDTO;

import java.util.List;

public interface CommentService {
    Comment getCommentById(Long id);
    List<Comment> getCommentsByPostId(Long postId);
    Comment createComment(Long userId, Long postId, CommentDTO comment);
    Comment updateComment(Long id, CommentDTO commentDetails);
    void deleteComment(Long userId, Long postId);
}
