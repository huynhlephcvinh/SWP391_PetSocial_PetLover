package com.petlover.petsocial.controller;

import com.petlover.petsocial.model.entity.Comment;
import com.petlover.petsocial.payload.request.CommentDTO;
import com.petlover.petsocial.service.CommentService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        Comment comment = commentService.getCommentById(id);
        return new ResponseEntity<>(comment, HttpStatus.OK);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PostMapping("/user/{userId}/post/{postId}")
    public ResponseEntity<Comment> createComment(@PathVariable Long userId, @PathVariable Long postId, @RequestBody CommentDTO comment) {
        Comment savedComment = commentService.createComment(userId, postId, comment);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody CommentDTO comment) {
        Comment updatedComment = commentService.updateComment(id, comment);
        return new ResponseEntity<>(updatedComment, HttpStatus.OK);
    }

    @DeleteMapping("/user/{userId}/post/{postId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long userId, @PathVariable Long postId) {
        commentService.deleteComment(userId, postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
