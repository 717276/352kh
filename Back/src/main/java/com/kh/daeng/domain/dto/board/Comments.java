package com.kh.daeng.domain.dto.board;

import java.util.Date;

import lombok.Data;

@Data
public class Comments {
	private int c_no;
    private int ar_no;
    private int m_no;
    private int c_parentNo;
    private String c_userId; 
    private int c_dept;
    private String c_content; 
    private Date c_createdDate;
    private int c_like;
}
