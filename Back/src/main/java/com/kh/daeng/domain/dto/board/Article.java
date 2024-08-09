package com.kh.daeng.domain.dto.board;

import java.util.Date;
import java.util.List;

import com.kh.daeng.domain.dto.util.Img;

import lombok.Data;

@Data
public class Article {
	private int ar_no;
    private int m_no; 
    private int t_no; 
    private String ar_title;
    private String ar_content; 
    private String ar_userId; 
    private Date ar_createdDate; 
    private int ar_like;
    private int ar_view;
    private String t_title;
    private List<Comments> com_list;
    private List<Img> img_list;
}
