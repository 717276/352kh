package com.kh.daeng.domain.dto.user;

import java.util.Date;

import com.kh.daeng.domain.dto.tour.Tour;

import lombok.Data;

@Data
public class OrderTour {
	private int ot_no;
	private int m_no;
	private int t_no;
	private int ot_price;
	private Date ot_orderDate;
	private int ot_status;
	private int payt_no;
	private Tour tour;
	private PaymentTour paymentTour;
}
