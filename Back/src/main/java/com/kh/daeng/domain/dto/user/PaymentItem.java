package com.kh.daeng.domain.dto.user;

import java.util.Date;

import lombok.Data;

@Data
public class PaymentItem {
    private int pay_no;
//    private int oi_no;
    private int pay_type;
    private Date pay_date;
    private int pay_total;
}
