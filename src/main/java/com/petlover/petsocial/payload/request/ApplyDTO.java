package com.petlover.petsocial.payload.request;

import com.petlover.petsocial.model.entity.Apply;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ApplyDTO {
    private Long id;
    private Date applyDate;
    private boolean status;
    private Long exchangeId;
    private Long userId;

    public static ApplyDTO convertToDTO(Apply apply) {
        ApplyDTO applyDTO = new ApplyDTO();
        applyDTO.setId(apply.getId());
        applyDTO.setApplyDate(apply.getApply_date());
        applyDTO.setStatus(apply.isStatus());

        // Assuming you have appropriate getters in the Exchange and User entities
        applyDTO.setExchangeId(apply.getExchange().getId());
        applyDTO.setUserId(apply.getUser().getId());

        return applyDTO;
    }

}


