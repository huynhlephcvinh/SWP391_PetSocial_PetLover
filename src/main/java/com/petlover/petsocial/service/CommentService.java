package com.petlover.petsocial.service;


import com.petlover.petsocial.payload.request.CommentDTO;

import java.util.List;

public interface CommentService {
    CommentDTO getCommentById(Long id);
    List<CommentDTO> getCommentsByPostId(Long postId);
    CommentDTO createComment(Long userId, Long postId, CommentDTO comment);
    CommentDTO updateComment(Long id, CommentDTO commentDetails);
    void deleteComment(Long commentId);
}
