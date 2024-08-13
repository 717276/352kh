package com.kh.daeng.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.kh.daeng.domain.dto.tour.Hotel;
import com.kh.daeng.domain.dto.user.OrderTour;
import com.kh.daeng.domain.dto.user.PaymentTour;
import com.kh.daeng.domain.dto.user.Preference;
import com.kh.daeng.domain.dto.tour.Place;
import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.domain.dto.tour.TourImg;

public interface TourMapper {

	// 투어 전체 리스트 불러오기
	public List<Tour> getAllTours() throws Exception;

	// 유저 선호도 pr_no 불러오기
	public int getUserPrNo(int userNo) throws Exception;

	// 유저 선호도 불러오기
	public Preference getUserPre(int pf_no) throws Exception;
	
	// 투어 상세 정보 불러오기
	public Tour getTourDetail(int t_no) throws Exception;
	
	// 유저의 TourList 불러오기
	public List<Integer> getUserTourList(int userNo) throws Exception;
	
	// 유저 투어 신청하기
	public void insertTourList(@Param("userNo") int userNo,@Param("t_no") int t_no) throws Exception;
	
	// 유저 투어 신청 취소하기
	public void deleteTourList(@Param("userNo") int userNo,@Param("t_no") int t_no) throws Exception;
	
	// admin 투어 승인하기
	public void statusUpdate(int t_no) throws Exception;

	// admin 투어 삭제하기
	public void deleteTour(int t_no) throws Exception;

	// 신청한 투어 정보 불러오기
	public List<Tour> getToursByUserNo(int userNo) throws Exception;

	// 신청한 투어 삭제하기
	public void deleteTourCart(int utl_no) throws Exception;

	// 투어 결제 정보 저장하기(PaymentTour)
	public void insertPaymentTour(PaymentTour pt) throws Exception;
	
	// 가장 최근 payt_no 불러오기
	public int getLatestPaymentTourId() throws Exception;

	// 각각의 투어 결제 정보 저장하기(OrderTour)
	public void insertOrderTour(OrderTour data) throws Exception;

	// 선호도 저장
	public void insertPreference(Preference preference) throws Exception;
	
	// 가장 최근 선호도 pf_no 불러오기
	public int getLastPreNo() throws Exception;
	
	// 투어 정보 저장
	public void insertTour(Tour tour) throws Exception;

	// 가장 최근 투어 t_no 불러오기
	public int getLastTourNo() throws Exception;

	// 투어 대표이미지 저장
	public void insertImg(@Param("t_no") int t_no, @Param("i_category") String i_category, @Param("i_order") int i_order) throws Exception;

	// 호텔 정보 저장
	public void insertHotel(Hotel hotel) throws Exception;

	// 가장 최근 호텔 h_no 불러오기
	public int getLastHotelNo() throws Exception;

	// 명소 정보 저장
	public void insertPlace(Place place) throws Exception;

	// 가장 최근 명소 pl_no 불러오기
	public int getLastPlaceNo() throws Exception;

	// 식당 정보 저장
	public void insertRes(Place res) throws Exception;

	// 가장 최근 식당 res_no 불러오기
	public int getLastResNo() throws Exception;

	// tourimg(호텔, 명소, 식당) 저장
	public void insertTourImg(TourImg ti) throws Exception;

	public List<Tour> getMainTour();

}
