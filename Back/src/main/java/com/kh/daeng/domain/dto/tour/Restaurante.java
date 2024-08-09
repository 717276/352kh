package com.kh.daeng.domain.dto.tour;

import lombok.Data;

@Data
public class Restaurante {
    private int res_no;
    private int t_no;
    private String res_location;
    private String res_name;
    private int res_day;
    private TourImg img;
}
