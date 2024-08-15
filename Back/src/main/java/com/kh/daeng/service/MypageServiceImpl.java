package com.kh.daeng.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.daeng.domain.dto.shop.CartItem;
import com.kh.daeng.domain.dto.user.Dog;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.OrderItem;
import com.kh.daeng.domain.dto.user.Preference;
import com.kh.daeng.domain.dto.util.Img;
import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.domain.dto.tour.TourList;
import com.kh.daeng.mapper.MypageMapper;
import com.kh.daeng.service.iface.MypageService;

@Service
public class MypageServiceImpl implements MypageService {



	@Autowired
	private MypageMapper mapper;
	@Override
	public int getPfNo(int m_no) {
		return mapper.getPfNo(m_no);		
	}
	@Override
	public void updatePf(Preference pf) throws Exception{		
		mapper.updatePf(pf);
	}

	// 유저 정보 불러오기
	@Override
	public Member getUser(int userNo) throws Exception {
		Member member = mapper.getUserInfo(userNo);							// 유저 정보 불러오기
		Dog dog = mapper.getDogByUserNo(userNo);							// 유저 강아지 정보 불러오기
		member.setDog(dog);
		List<Tour> tours = mapper.getToursByUserNo(userNo);					// 결제한 투어 정보 불러오기
		member.setTours(tours);
		
		List<OrderItem> orderItems = mapper.getOrderItemsByUserNo(userNo);	// 결제한 상품 정보 불러오기
		member.setOrderItems(orderItems);

		List<CartItem> cartItems = mapper.getCartItemsByUserNo(userNo);		// 상품 장바구니 정보 불러오기
		member.setCartItems(cartItems);
		
		List<TourList> tourList = mapper.getTourListByUserNo(userNo);		// 신청한 투어 정보 불러오기
		System.err.println("tour List user no " + tourList);
		member.setTourList(tourList);
		
		Img img = mapper.getProImg(userNo);									// 프로필이미지 물러오기
		member.setImg(img);
		return member;
	}

	// m_userId 업데이트
	@Override
	public void updateUserId(int userNo, String userId) throws Exception {
		mapper.updateUserId(userNo, userId);
	}

	// m_name 업데이트
	@Override
	public void updateName(int userNo, String name) throws Exception {
		mapper.updateName(userNo, name);
	}

	// m_phone 업데이트
	@Override
	public void updatePhone(int userNo, int phone) throws Exception {
		mapper.updatePhone(userNo, phone);
	}

	// m_postNo, m_detailAddress, m_basicAddress 업데이트
	@Override
	public void updateAddress(int userNo, String postNo, String basicAddress, String detailAddress) throws Exception {
		mapper.updateAddress(userNo, postNo, basicAddress, detailAddress);
	}

	// d_name 업데이트
	@Override
	public void updateDogName(int userNo, String dogName) throws Exception {
		mapper.updateDogName(userNo, dogName);
	}

	// d_breed 업데이트
	@Override
	public void updateBreed(int userNo, String breed) throws Exception {
		mapper.updateBreed(userNo, breed);
	}

	// d_size 업데이트
	@Override
	public void updateDsize(int userNo, int dsize) throws Exception {
		mapper.updateDsize(userNo, dsize);
	}

	// 프로필 이미지 저장
	@Override
	public void insertImg(int userNo) throws Exception {
		mapper.insertImg(userNo);		
	}
	

}
