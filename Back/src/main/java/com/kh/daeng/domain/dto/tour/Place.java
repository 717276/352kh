package com.kh.daeng.domain.dto.tour;

import lombok.Data;
@Data
public class Place {
    private int pl_no;
    private int t_no;
    private String pl_location;
    private String pl_name;
    private int pl_day;
    private TourImg img;	
}
