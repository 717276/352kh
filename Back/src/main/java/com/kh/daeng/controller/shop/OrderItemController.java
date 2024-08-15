package com.kh.daeng.controller.shop;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
	
	// 장바구니 불러오기
	@GetMapping("/order/{userNo}")
	public List<CartItem> getCartItems(@PathVariable(name = "userNo") int userNo) throws Exception {
		return service.getCartItems(userNo);
	}
	
	// 장바구니 삭제하기
	@DeleteMapping("/deleteCart/{ciNo}")
	public void deleteCart(@PathVariable(name = "ciNo") int ciNo) throws Exception{
		service.deleteCart(ciNo);
	}
	
	// order 페이지에서 사용자 정보 불러오기(배송지 입력)
	@GetMapping("/order/user/{userNo}")
	public Member getUserInfo(@PathVariable(name = "userNo") int userNo) throws Exception {
		return service.getUserInfo(userNo);
	}
	@PostMapping("/order/insert")
    public ResponseEntity<Map<String,Object>> insertCart (@RequestBody Map<String, Object> productInfo) throws Exception{
        log.info("상품 주문 진입함");
        CartItem item = new CartItem();
        String s_pd_no = (String) productInfo.get("pd_no");
        log.info("s_pd_no : "+s_pd_no);
        int pd_no = Integer.parseInt(s_pd_no);
        item = service.findCartItemByPdNoAndMNo(pd_no,(Integer)productInfo.get("m_no"));

        log.info("상품 번호 : "+pd_no);
        if(item!=null) {
            item.setCi_quantity(item.getCi_quantity()+(Integer)productInfo.get("ci_quantity"));
            service.modifyCart(pd_no,item.getCi_quantity(),(Integer)productInfo.get("m_no"));
        }else {
            item = new CartItem();
            item.setCi_quantity((Integer)productInfo.get("ci_quantity"));
            item.setM_no((Integer)productInfo.get("m_no"));
            item.setPd_no(pd_no);
            service.insertCart(item);
        }

        return ResponseEntity.ok(Map.of("success", true));
    }
	// 결제 정보 저장하기
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
	
	// 결제 타입 변경하기
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
