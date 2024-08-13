package com.kh.daeng.domain.dto.user;

import java.util.List;

import com.kh.daeng.domain.dto.shop.CartItem;
import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.domain.dto.tour.TourList;
import com.kh.daeng.domain.dto.util.Img;

import lombok.Data;

@Data
public class Member {
	private int m_no;
	private int pf_no;
	private String m_userId;
	private String m_name;
	private String m_email;
	private String m_password;
	private int m_phone;
	private String m_basicAddress;
	private String m_detailAddress;
	private String m_postNo;
	private String m_role;
	private String m_provider;
	private Preference preference;
	private Dog dog;
    private List<Tour> tours;
    private List<OrderItem> orderItems;
    private List<CartItem> cartItems;
    private List<TourList> tourList;
    //프로필이미지 
    private Img img;
}
