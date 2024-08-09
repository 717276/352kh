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
	
	@Override
	public List<CartItem> getCartItems(int userNo) throws Exception {
		return mapper.getCartItems(userNo);
	}

	@Override
	public void deleteCart(int ciNo) throws Exception {
		mapper.deleteCart(ciNo);
	}

	@Override
	public Member getUserInfo(int userNo) throws Exception {
		return mapper.getUserInfo(userNo);
	}

	@Override
	public void saveOrderData(int userNo, List<OrderItem> orderItems, PaymentItem paymentItem) throws Exception{
		mapper.insertPaymentItem(paymentItem);
		int payNo = mapper.getLatestPaymentId();
		
		for(OrderItem data : orderItems) {
			data.setPay_no(payNo);
			data.setM_no(userNo);
			mapper.insertOrderItem(data);
		}
	}

}
