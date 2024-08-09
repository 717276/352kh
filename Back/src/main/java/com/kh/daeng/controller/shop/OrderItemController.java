package com.kh.daeng.controller.shop;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.daeng.domain.dto.shop.CartItem;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.OrderItem;
import com.kh.daeng.domain.dto.user.PaymentItem;
import com.kh.daeng.service.iface.OrderItemService;

import lombok.extern.java.Log;

@Log
@RestController
@RequestMapping("/api")
public class OrderItemController {
	
	@Autowired
	private OrderItemService service;
	
	@GetMapping("/order/{userNo}")
	public List<CartItem> getCartItems(@PathVariable(name = "userNo") int userNo) throws Exception {
		return service.getCartItems(userNo);
	}
	
	@DeleteMapping("/deleteCart/{ciNo}")
	public void deleteCart(@PathVariable(name = "ciNo") int ciNo) throws Exception{
		service.deleteCart(ciNo);
	}
	
	@GetMapping("/order/user/{userNo}")
	public Member getUserInfo(@PathVariable(name = "userNo") int userNo) throws Exception {
		return service.getUserInfo(userNo);
	}
	
	@PostMapping("/order/save")
	public void saveOrderData(@RequestBody Map<String, Object> orderData) throws Exception {
	    int userNo = Integer.parseInt(orderData.get("userNo").toString());
	    List<Map<String, Object>> orderItemsData = (List<Map<String, Object>>) orderData.get("orderItems");
	    Map<String, Object> paymentData = (Map<String, Object>) orderData.get("payment");
	    List<OrderItem> orderItems = orderItemsData.stream().map(itemData -> {
	        OrderItem orderItem = new OrderItem();
	        orderItem.setPd_no(Integer.parseInt(itemData.get("pd_no").toString()));
	        orderItem.setOi_price(Integer.parseInt(itemData.get("oi_price").toString()));
	        orderItem.setOi_quantity(Integer.parseInt(itemData.get("oi_quantity").toString()));
	        orderItem.setOi_basicAddress(itemData.get("oi_basicAddress").toString());
	        orderItem.setOi_detailAddress(itemData.get("oi_detailAddress").toString());
	        orderItem.setOi_postNo(itemData.get("oi_postNo").toString());
	        return orderItem;
	    }).collect(Collectors.toList());
	    PaymentItem paymentItem = new PaymentItem();
	    paymentItem.setPay_type(convertPaymentType(paymentData.get("pay_type").toString()));
	    paymentItem.setPay_total(Integer.parseInt(paymentData.get("pay_total").toString()));
	    service.saveOrderData(userNo, orderItems, paymentItem);
	}
	
	public int convertPaymentType(String payType) {
	    switch (payType) {
	        case "card/easy":
	            return 0;
	        case "trans":
	            return 1;
	        case "vbank":
	            return 2;
	        case "phone":
	            return 3;
	        default:
	            throw new IllegalArgumentException("Invalid payment type: " + payType);
	    }
	}
}
