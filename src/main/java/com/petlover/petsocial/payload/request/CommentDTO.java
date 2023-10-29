package com.petlover.petsocial.payload.request;


import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;
@NoArgsConstructor
public class CommentDTO {
    private Long id;
    private String content;
    private List<String> media;
    private Long userId;
    private Long postId;
    @CreationTimestamp
    private LocalDateTime createdTime;

    public CommentDTO(Long id, String content, List<String> media, Long userId, Long postId, LocalDateTime createdTime) {
        this.id = id;
        this.content = content;
        this.media = media;
        this.userId = userId;
        this.postId = postId;
        this.createdTime = createdTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
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

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }
}
