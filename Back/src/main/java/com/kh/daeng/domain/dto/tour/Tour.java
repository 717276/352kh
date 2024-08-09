package com.kh.daeng.domain.dto.tour;

import java.util.Date;
import java.util.List;

import com.kh.daeng.domain.dto.board.Article;
import com.kh.daeng.domain.dto.user.Preference;
import com.kh.daeng.domain.dto.util.Img;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Tour {
    private int t_no;
    private String t_title;
    private String t_explain;	//CLOB 데이터베이스
    private int t_totalPrice;
    private Date t_strDate;
    private Date t_endDate;
    private int t_status;
    private int pf_no;
    
    private Img img;
    private Preference pre;
    private List<Hotel> hotels;
    private List<Place> places;
    private List<Restaurante> restaurantes;
    private List<Article> articles;
}
