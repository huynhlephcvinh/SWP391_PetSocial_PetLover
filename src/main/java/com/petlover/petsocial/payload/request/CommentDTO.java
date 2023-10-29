package com.petlover.petsocial.payload.request;


import java.time.LocalDateTime;
import java.util.List;

public class CommentDTO {
    private Long id;
    private List<String> content;
    private List<String> media;
    private Long userId;
    private Long postId;
    private Long replyForId;
    private LocalDateTime createdTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getContent() {
        return content;
    }

    public void setContent(List<String> content) {
        this.content = content;
    }

    public List<String> getMedia() {
        return media;
    }

    public void setMedia(List<String> media) {
        this.media = media;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getReplyForId() {
        return replyForId;
    }

    public void setReplyForId(Long replyForId) {
        this.replyForId = replyForId;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }
}
