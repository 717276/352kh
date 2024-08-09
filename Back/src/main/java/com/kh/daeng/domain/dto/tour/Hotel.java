package com.kh.daeng.domain.dto.tour;

import lombok.Data;

@Data
public class Hotel {
    private int h_no;
    private int t_no;
    private String h_name;
    private int h_price;
    private int h_day;
    private TourImg img;
}

