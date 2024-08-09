package com.kh.daeng.domain.dto.shop;

import lombok.Data;

@Data
public class CartItem {
	private int ci_no;
	private int pd_no;
	private int m_no;
	private int ci_quantity;
	private Product product;
}
