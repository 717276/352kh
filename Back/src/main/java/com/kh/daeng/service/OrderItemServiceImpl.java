package com.kh.daeng.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.daeng.domain.dto.shop.CartItem;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.OrderItem;
import com.kh.daeng.domain.dto.user.PaymentItem;
import com.kh.daeng.mapper.OrderItemMapper;
import com.kh.daeng.service.iface.OrderItemService;

@Service
public class OrderItemServiceImpl implements OrderItemService{

	@Autowired
	private OrderItemMapper mapper;
	
	// 장바구니 불러오기
	@Override
	public List<CartItem> getCartItems(int userNo) throws Exception {
		return mapper.getCartItems(userNo);
	}

	// 장바구니 삭제하기
	@Override
	public void deleteCart(int ciNo) throws Exception {
		mapper.deleteCart(ciNo);
	}

	// order 페이지에서 사용자 정보 불러오기(배송지 입력)
	@Override
	public Member getUserInfo(int userNo) throws Exception {
		return mapper.getUserInfo(userNo);
	}

	// 결제 정보 저장하기
	@Override
	public void saveOrderData(int userNo, List<OrderItem> orderItems, PaymentItem paymentItem) throws Exception{
		mapper.insertPaymentItem(paymentItem);			//Payitem 결제 정보 저장하기
		int payNo = mapper.getLatestPaymentId();		//Payitem 최근 pay_no 불러오기
		
		// 결제한 상품데이터 저장
		for(OrderItem data : orderItems) {
			data.setPay_no(payNo);						
			data.setM_no(userNo);
			mapper.insertOrderItem(data);
		}
	}

}
