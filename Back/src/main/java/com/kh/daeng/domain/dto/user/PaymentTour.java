package com.kh.daeng.domain.dto.user;

import java.util.Date;

import lombok.Data;

@Data
public class PaymentTour {
    private int payt_no;
//    private int ot_no;
    private int payt_type;
    private Date payt_Date;
    private int payt_total;
}
