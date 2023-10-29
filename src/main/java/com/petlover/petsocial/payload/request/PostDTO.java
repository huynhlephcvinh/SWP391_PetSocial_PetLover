package com.petlover.petsocial.payload.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostDTO {
    private Long id;
    private String image;
    private String content;
    private String create_date;
    private int total_like;
    private List<CommentDTO> comments;
    private PetToPostDTO petToPostDTO;
    private UserPostDTO userPostDTO;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreate_date() {
        return create_date;
    }

    public void setCreate_date(String create_date) {
        this.create_date = create_date;
    }

    public int getTotal_like() {
        return total_like;
    }

    public void setTotal_like(int total_like) {
        this.total_like = total_like;
    }

    public List<CommentDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentDTO> comments) {
        this.comments = comments;
    }

    public PetToPostDTO getPetToPostDTO() {
        return petToPostDTO;
    }

    public void setPetToPostDTO(PetToPostDTO petToPostDTO) {
        this.petToPostDTO = petToPostDTO;
    }

    public UserPostDTO getUserPostDTO() {
        return userPostDTO;
    }

    public void setUserPostDTO(UserPostDTO userPostDTO) {
        this.userPostDTO = userPostDTO;
    }
}
