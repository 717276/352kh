package com.kh.daeng.service.iface;

import com.kh.daeng.domain.dto.user.Member;

public interface MypageService {

	public Member getUser(int userNo) throws Exception;

	public void updateUserId(int userNo, String userId) throws Exception;

	public void updateName(int userNo, String name) throws Exception;

	public void updatePhone(int userNo, int phone) throws Exception;

	public void updateAddress(int userNo, String postNo, String basicAddress, String detailAddress) throws Exception;

	public void updateDogName(int userNo, String dogName) throws Exception;

	public void updateBreed(int userNo, String breed) throws Exception;

	public void updateDsize(int userNo, int dsize) throws Exception;



}
