package com.kh.daeng.service.iface;

import java.util.List;

import com.kh.daeng.domain.dto.shop.CartItem;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.OrderItem;
import com.kh.daeng.domain.dto.user.PaymentItem;

public interface OrderItemService {

	public List<CartItem> getCartItems(int userNo) throws Exception;

	public void deleteCart(int ciNo) throws Exception;

	public Member getUserInfo(int userNo) throws Exception;
	
	public void saveOrderData(int userNo, List<OrderItem> orderItems, PaymentItem paymentItem) throws Exception;
}
