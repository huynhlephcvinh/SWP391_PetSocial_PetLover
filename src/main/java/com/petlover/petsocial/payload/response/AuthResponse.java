package com.petlover.petsocial.payload.response;

import com.petlover.petsocial.payload.request.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthResponse {
    private String jwt;
    private boolean status;
    private String role;
}
