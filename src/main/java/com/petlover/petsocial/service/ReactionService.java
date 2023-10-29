package com.petlover.petsocial.service;

import com.petlover.petsocial.exception.PostException;
import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.model.entity.Reaction;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.ReactionDTO;
import com.petlover.petsocial.payload.request.UserDTO;

import java.util.List;

public interface ReactionService {
    public ReactionDTO reactionPost(Long idPost, UserDTO userDTO) throws UserException, PostException;
    public List<ReactionDTO> getAllReaction(Long idPost) throws PostException;
    public ReactionDTO reactComment(Long idComment, UserDTO userDTO) throws UserException;
}
