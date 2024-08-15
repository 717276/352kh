package com.kh.daeng.domain.dto.shop;

import java.util.Date;
import java.util.List;

import com.kh.daeng.domain.dto.util.Img;

import lombok.Data;

@Data
public class Product {	
	private int pd_no;
	private String pd_name;
	private String pd_explain;
	private int pd_mount;
	private int pd_price;
	private int pd_discount;
	private Date pd_registrationDate;
	private int pd_category;	
	private List<Img> img_list;
	private Img img;
}
