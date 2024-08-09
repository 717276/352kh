package com.kh.daeng.mapper;

import java.util.List;

import com.kh.daeng.domain.dto.shop.CartItem;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.OrderItem;
import com.kh.daeng.domain.dto.user.PaymentItem;

public interface OrderItemMapper {

	public List<CartItem> getCartItems(int userNo) throws Exception;

	public void deleteCart(int ciNo) throws Exception;

	public Member getUserInfo(int userNo) throws Exception;
	
	public void insertPaymentItem(PaymentItem paymentItem) throws Exception;
	
	public int getLatestPaymentId() throws Exception;
	
	public void insertOrderItem(OrderItem orderItem) throws Exception;
}
