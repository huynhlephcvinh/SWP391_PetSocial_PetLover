package com.petlover.petsocial.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateExchangeDTO {
    private PetDTO petDTO;
    private String description;
    private int paymentAmount;
}