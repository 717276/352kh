package com.kh.daeng.service.iface;

import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.Preference;

public interface MypageService {

	// 유저 정보 불러오기
	public Member getUser(int userNo) throws Exception;

	// m_userId 업데이트
	public void updateUserId(int userNo, String userId) throws Exception;

	// m_name 업데이트
	public void updateName(int userNo, String name) throws Exception;

	// m_phone 업데이트
	public void updatePhone(int userNo, int phone) throws Exception;

	// m_postNo, m_detailAddress, m_basicAddress 업데이트
	public void updateAddress(int userNo, String postNo, String basicAddress, String detailAddress) throws Exception;

	// d_name 업데이트
	public void updateDogName(int userNo, String dogName) throws Exception;

	// d_breed 업데이트
	public void updateBreed(int userNo, String breed) throws Exception;

	// d_size 업데이트
	public void updateDsize(int userNo, int dsize) throws Exception;

	// 이미지 저장
	public void insertImg(int userNo) throws Exception;

	public void updatePf(Preference preference) throws Exception;

	public int getPfNo(int mNo);

}
