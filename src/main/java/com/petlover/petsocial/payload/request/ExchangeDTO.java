package com.petlover.petsocial.payload.request;

import com.petlover.petsocial.model.entity.ExStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ExchangeDTO {
    private int id;
    private Date exchangeDate;
    private int paymentAmount;
    private ExStatus status;
    private int userId;
    private int petId;
}
