package com.kh.daeng.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.daeng.domain.dto.shop.CartItem;
import com.kh.daeng.domain.dto.user.Dog;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.OrderItem;
import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.domain.dto.tour.TourList;
import com.kh.daeng.mapper.MypageMapper;
import com.kh.daeng.service.iface.MypageService;

@Service
public class MypageServiceImpl implements MypageService {

	@Autowired
	private MypageMapper mapper;

	@Override
	public Member getUser(int userNo) throws Exception {
		Member member = mapper.getUserInfo(userNo);
		Dog dog = mapper.getDogByUserNo(userNo);
		member.setDog(dog);
		
		List<Tour> tours = mapper.getToursByUserNo(userNo);
		member.setTours(tours);
		
		List<OrderItem> orderItems = mapper.getOrderItemsByUserNo(userNo);
		member.setOrderItems(orderItems);

		List<CartItem> cartItems = mapper.getCartItemsByUserNo(userNo);
		member.setCartItems(cartItems);
		
		List<TourList> tourList = mapper.getTourListByUserNo(userNo);
		member.setTourList(tourList);
		System.out.println( mapper.getTourListByUserNo(userNo));
		return member;
	}

	@Override
	public void updateUserId(int userNo, String userId) throws Exception {
		mapper.updateUserId(userNo, userId);
	}

	@Override
	public void updateName(int userNo, String name) throws Exception {
		mapper.updateName(userNo, name);
	}

	@Override
	public void updatePhone(int userNo, int phone) throws Exception {
		mapper.updatePhone(userNo, phone);
	}

	@Override
	public void updateAddress(int userNo, String postNo, String basicAddress, String detailAddress) throws Exception {
		mapper.updateAddress(userNo, postNo, basicAddress, detailAddress);
	}

	@Override
	public void updateDogName(int userNo, String dogName) throws Exception {
		mapper.updateDogName(userNo, dogName);
	}

	@Override
	public void updateBreed(int userNo, String breed) throws Exception {
		mapper.updateBreed(userNo, breed);
	}

	@Override
	public void updateDsize(int userNo, int dsize) throws Exception {
		mapper.updateDsize(userNo, dsize);
	}

}
