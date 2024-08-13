package com.kh.daeng.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;

import com.kh.daeng.domain.dto.shop.CartItem;
import com.kh.daeng.domain.dto.user.Dog;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.OrderItem;
import com.kh.daeng.domain.dto.util.Img;
import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.domain.dto.tour.TourList;

public interface MypageMapper {

	// 유저 정보 불러오기
	public Member getUserInfo(int userNo) throws Exception;

	// 유저 강아지 정보 불러오기
	public Dog getDogByUserNo(int userNo) throws Exception;
	
	// 결제한 투어 정보 불러오기
	public List<Tour> getToursByUserNo(int userNo) throws Exception;
	
	// 결제한 상품 정보 불러오기
	public List<OrderItem> getOrderItemsByUserNo(int userNo) throws Exception;

	// 상품 장바구니 정보 불러오기
	public List<CartItem> getCartItemsByUserNo(int userNo) throws Exception;

	// 신청한 투어 정보 불러오기
	public List<TourList> getTourListByUserNo(int userNo) throws Exception;
	
	// 프로필 이미지 정보 불러오기
	public Img getProImg(int userNo) throws Exception;

	// m_userId 업데이트
	public void updateUserId(@Param("userNo") int userNo, @Param("userId") String userId) throws Exception;

	// m_name 업데이트
	public void updateName(@Param("userNo") int userNo, @Param("name") String name) throws Exception;

	// m_phone 업데이트
	public void updatePhone(@Param("userNo") int userNo, @Param("phone") int phone) throws Exception;

	// m_postNo, m_detailAddress, m_basicAddress 업데이트
	public void updateAddress(@Param("userNo") int userNo, @Param("postNo") String postNo,
			@Param("basicAddress") String basicAddress, @Param("detailAddress") String detailAddress) throws Exception;

	// d_name 업데이트
	public void updateDogName(@Param("userNo") int userNo, @Param("dogName") String dogName) throws Exception;

	// d_breed 업데이트
	public void updateBreed(@Param("userNo") int userNo, @Param("breed") String breed) throws Exception;

	// d_size 업데이트
	public void updateDsize(@Param("userNo") int userNo, @Param("dsize") int dsize) throws Exception;

	// 프로필 이미지 저장
	public void insertImg(int userNo) throws Exception;

}
