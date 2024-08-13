package com.kh.daeng.service.iface;

import java.util.List;

import com.kh.daeng.domain.dto.shop.CartItem;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.OrderItem;
import com.kh.daeng.domain.dto.user.PaymentItem;

public interface OrderItemService {

	// 장바구니 불러오기
	public List<CartItem> getCartItems(int userNo) throws Exception;

	// 장바구니 삭제하기
	public void deleteCart(int ciNo) throws Exception;

	// order 페이지에서 사용자 정보 불러오기(배송지 입력)
	public Member getUserInfo(int userNo) throws Exception;
	
	// 결제 정보 저장하기
	public void saveOrderData(int userNo, List<OrderItem> orderItems, PaymentItem paymentItem) throws Exception;
}
