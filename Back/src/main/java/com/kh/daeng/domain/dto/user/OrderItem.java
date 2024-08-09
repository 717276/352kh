package com.kh.daeng.domain.dto.user;

import java.util.Date;

import com.kh.daeng.domain.dto.shop.Product;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class OrderItem {
    private int oi_no;
    private int pd_no;
    private int m_no;
    private int oi_price;
    private int oi_quantity;
    private Date oi_orderDate;
    private String oi_basicAddress;
    private String oi_detailAddress;
    private String oi_postNo;
    private int oi_status;
    private Product product;
    private PaymentItem paymentItem;
    private int pay_no;
}
