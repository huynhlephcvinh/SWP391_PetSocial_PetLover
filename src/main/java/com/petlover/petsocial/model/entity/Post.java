package com.petlover.petsocial.model.entity;


import com.petlover.petsocial.payload.request.CommentDTO;
import jakarta.persistence.*;
import lombok.*;


import java.util.List;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

@Table(name="Post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "content", columnDefinition = "nvarchar(1111)")
    private String content;
    @Column(name = "image", columnDefinition = "nvarchar(1111)")
    private String image;
    private boolean enable;
    private String create_date;
    private int total_like;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Pet pet;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Comment> comments;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Reaction> reactions;
    @Column(name = "status")
    private boolean status;

    public CommentDTO convertCommentToDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setContent(comment.getContent());
        commentDTO.setMedia(comment.getMedia());
        commentDTO.setUserId(comment.getUser().getId());
        commentDTO.setPostId(comment.getPost().getId());
        commentDTO.setCreatedTime(comment.getCreatedTime());
        return commentDTO;
    }

    public List<CommentDTO> convertCommentListToDTO(List<Comment> commentList) {
        return commentList.stream().map(this::convertCommentToDTO).collect(Collectors.toList());
    }
}
