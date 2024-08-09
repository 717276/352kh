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

	public List<Tour> getAllTours() throws Exception;

	public Tour getTourDetail(int t_no) throws Exception;
	
	public List<Integer> getUserTourList(int userNo) throws Exception;
	
	public void insertTourList(@Param("userNo") int userNo,@Param("t_no") int t_no) throws Exception;
	
	public void deleteTourList(@Param("userNo") int userNo,@Param("t_no") int t_no) throws Exception;
	
	public int getUserPrNo(int userNo) throws Exception;

	public Preference getUserPre(int pf_no) throws Exception;
	
	public void statusUpdate(int t_no) throws Exception;

	public void deleteTour(int t_no) throws Exception;

	public List<Tour> getToursByUserNo(int userNo) throws Exception;

	public void deleteTourCart(int utl_no) throws Exception;

	public void insertPaymentTour(PaymentTour pt) throws Exception;


	public int getLatestPaymentTourId() throws Exception;

	public void insertOrderTour(OrderTour data) throws Exception;

	public void insertPreference(Preference preference) throws Exception;
	
	public int getLastPreNo() throws Exception;
	
	public void insertTour(Tour tour) throws Exception;

	public int getLastTourNo() throws Exception;

	public void insertImg(@Param("t_no") int t_no, @Param("i_category") String i_category, @Param("i_order") int i_order) throws Exception;

	public void insertHotel(Hotel hotel) throws Exception;

	public int getLastHotelNo() throws Exception;

	public void insertPlace(Place place) throws Exception;

	public int getLastPlaceNo() throws Exception;

	public void insertRes(Place res) throws Exception;

	public int getLastResNo() throws Exception;

	public void insertTourImg(TourImg ti) throws Exception;



}
