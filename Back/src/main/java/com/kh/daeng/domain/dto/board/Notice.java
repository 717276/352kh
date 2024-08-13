package com.kh.daeng.domain.dto.board;

import java.util.Date;

import lombok.Data;
@Data
public class Notice {
	private int n_no;
	private String n_title;
	private String n_content;
	private Date n_createdDate;
	private int n_view;
	private int n_category;
}