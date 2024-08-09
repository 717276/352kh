package com.kh.daeng.service.iface;

import java.util.List;


import com.kh.daeng.domain.dto.user.OrderTour;
import com.kh.daeng.domain.dto.user.PaymentTour;
import com.kh.daeng.domain.dto.user.Preference;
import com.kh.daeng.domain.dto.tour.Tour;

public interface TourService {

	public List<Tour> getAllTours() throws Exception;

	public Preference getUserPre(int userNo) throws Exception;

	public Tour getTourDetail(int t_no) throws Exception;

	public List<Integer> getUserTourList(int userNo) throws Exception;

	public void insertTourList(int userNo, int t_no) throws Exception;

	public void deleteTourList(int userNo, int t_no) throws Exception;

	public void statusUpdata(int t_no) throws Exception;

	public void deleteTour(int t_no) throws Exception;

	public List<Tour> getToursByUserNo(int userNo) throws Exception;

	public void deleteTourCart(int utl_no) throws Exception;

	public void saveTourOrder(int userNo, List<OrderTour> ordertours, PaymentTour pt) throws Exception;

	public int createTour(Tour tour, List<String> categories, String toursJson) throws Exception;


}
