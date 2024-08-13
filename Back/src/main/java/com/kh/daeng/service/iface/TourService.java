package com.kh.daeng.service.iface;

import java.util.List;


import com.kh.daeng.domain.dto.user.OrderTour;
import com.kh.daeng.domain.dto.user.PaymentTour;
import com.kh.daeng.domain.dto.user.Preference;
import com.kh.daeng.domain.dto.tour.Tour;

public interface TourService {

	// 투어 전체 리스트 불러오기
	public List<Tour> getAllTours() throws Exception;

	// m_no를 이용하여 유저의 선호도 불러오기
	public Preference getUserPre(int userNo) throws Exception;

	// t_no를 이용하여 해당 투어의 상세정보 불러오기
	public Tour getTourDetail(int t_no) throws Exception;

	// m_no로 유저의 TourList 불러오기
	public List<Integer> getUserTourList(int userNo) throws Exception;

	// m_no와 t_no로 투어 신청하기
	public void insertTourList(int userNo, int t_no) throws Exception;

	// m_no와 t_no로 투어 신청 취소하기
	public void deleteTourList(int userNo, int t_no) throws Exception;

	// admin 투어 승인하기
	public void statusUpdata(int t_no) throws Exception;

	//admin 투어 삭제하기
	public void deleteTour(int t_no) throws Exception;

	// 신청한 투어 정보 불러오기
	public List<Tour> getToursByUserNo(int userNo) throws Exception;

	// 신청한 투어 취소하기
	public void deleteTourCart(int utl_no) throws Exception;

	// 투어 결제하기
	public void saveTourOrder(int userNo, List<OrderTour> ordertours, PaymentTour pt) throws Exception;

	// 투어 생성하기
	public int createTour(Tour tour, List<String> categories, String toursJson) throws Exception;

	public List<Tour> getMainTour();


}
