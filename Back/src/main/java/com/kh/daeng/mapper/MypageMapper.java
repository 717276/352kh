package com.kh.daeng.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;

import com.kh.daeng.domain.dto.shop.CartItem;
import com.kh.daeng.domain.dto.user.Dog;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.OrderItem;
import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.domain.dto.tour.TourList;

public interface MypageMapper {

	public Member getUserInfo(int userNo) throws Exception;

	public Dog getDogByUserNo(int userNo) throws Exception;

	public void updateUserId(@Param("userNo") int userNo, @Param("userId") String userId) throws Exception;

	public void updateName(@Param("userNo") int userNo, @Param("name") String name) throws Exception;

	public void updatePhone(@Param("userNo") int userNo, @Param("phone") int phone) throws Exception;

	public void updateAddress(@Param("userNo") int userNo, @Param("postNo") String postNo,
			@Param("basicAddress") String basicAddress, @Param("detailAddress") String detailAddress) throws Exception;

	public void updateDogName(@Param("userNo") int userNo, @Param("dogName") String dogName) throws Exception;

	public void updateBreed(@Param("userNo") int userNo, @Param("breed") String breed) throws Exception;

	public void updateDsize(@Param("userNo") int userNo, @Param("dsize") int dsize) throws Exception;

	public List<Tour> getToursByUserNo(int userNo) throws Exception;
	
	public List<OrderItem> getOrderItemsByUserNo(int userNo) throws Exception;

	public List<CartItem> getCartItemsByUserNo(int userNo) throws Exception;

	public List<TourList> getTourListByUserNo(int userNo) throws Exception;

}
