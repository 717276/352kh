package com.kh.daeng.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.kh.daeng.domain.dto.shop.CartItem;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.OrderItem;
import com.kh.daeng.domain.dto.user.PaymentItem;

public interface OrderItemMapper {

	// 장바구니 불러오기
	public List<CartItem> getCartItems(int userNo) throws Exception;

	// 장바구니 삭제하기
	public void deleteCart(int ciNo) throws Exception;

	// order 페이지에서 사용자 정보 불러오기(배송지 입력)
	public Member getUserInfo(int userNo) throws Exception;
	
	//Payitem 결제 정보 저장하기
	public void insertPaymentItem(PaymentItem paymentItem) throws Exception;
	
	//Payitem 최근 pay_no 불러오기
	public int getLatestPaymentId() throws Exception;
	
	// 결제한 상품 데이터 저장
	public void insertOrderItem(OrderItem orderItem) throws Exception;
	
	public void insertCart(CartItem item);
	
    public CartItem findCartItemByPdNoAndMNo(@Param("pd_no") int pd_no, @Param("m_no") int m_no);

    public void modifyCart(@Param("pd_no") int pd_no, @Param("m_no") int m_no,@Param("ci_quantity")  int ci_quantity);
}
