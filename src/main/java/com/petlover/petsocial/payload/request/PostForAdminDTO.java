package com.petlover.petsocial.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostForAdminDTO {
    private int id;
    private String image;
    private String content;
    private String create_date;
    private int total_like;
    private String user_name;
    private boolean status;
    private boolean enable;
}
