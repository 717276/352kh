package com.kh.daeng.controller.tour;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.daeng.domain.dto.user.OrderTour;
import com.kh.daeng.domain.dto.user.PaymentTour;
import com.kh.daeng.domain.dto.user.Preference;
import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.service.iface.TourService;

import lombok.extern.java.Log;

@Log
@RestController
@RequestMapping("/api")
public class TourController {

	@Autowired
	private TourService service;

	// 메인 리스트
	@GetMapping("/main/tour")
	public List<Tour>getMainTour(){
		return service.getMainTour();
	}
	
	
	// 전체 리스트 불러오기
	@GetMapping("/trip")
	public List<Tour> getAllTours() throws Exception {		
		return service.getAllTours();
	}

	// m_no를 이용하여 유저의 선호도 불러오기
	@GetMapping("/getPre/{userNo}")
	public Preference getUserPre(@PathVariable(name = "userNo") int userNo) throws Exception {
		return service.getUserPre(userNo);
	}

	// t_no를 이용하여 해당 투어의 상세정보 불러오기
	@GetMapping("/tripDetail/{no}")
	public Tour getTourDetail(@PathVariable(name = "no") int t_no) throws Exception {
		System.out.println("들어와지나");
		System.out.println(service.getTourDetail(t_no));		
		return service.getTourDetail(t_no);
	}
	
	// m_no로 유저의 TourList 불러오기
	@GetMapping("userTourList/{userNo}")
	public List<Integer> getUserTourList(@PathVariable(name = "userNo") int userNo) throws Exception {
		return service.getUserTourList(userNo);
	}

	// m_no와 t_no로 투어 신청하기
	@PostMapping("/applyForTour")
	public void applyForTour(@RequestBody Map<String, Object> request) throws Exception {
		int userNo = Integer.parseInt(request.get("userNo").toString());
		int t_no = Integer.parseInt(request.get("t_no").toString());
		service.insertTourList(userNo, t_no);
	}
	
	// m_no와 t_no로 투어 신청 취소하기
	@DeleteMapping("/cancelTour")
	public void cancelTour(@RequestBody Map<String, Object> request) throws Exception {
		int userNo = Integer.parseInt(request.get("userNo").toString());
		int t_no = Integer.parseInt(request.get("t_no").toString());
		service.deleteTourList(userNo, t_no);
	}

	// admin 투어 승인하기
	@PutMapping("/admin/tripStatusChange/{t_no}")
	public void statusUpdate(@PathVariable(name = "t_no") int t_no) throws Exception {
		service.statusUpdata(t_no);
	}

	//admin 투어 삭제하기
	@DeleteMapping("/admin/tourDelete/{t_no}")
	public void tourDelete(@PathVariable(name = "t_no") int t_no) throws Exception {
		service.deleteTour(t_no);
	}

	// 신청한 투어 정보 불러오기
	@GetMapping("/tourOrder/{userNo}")
	public List<Tour> getTourOrder(@PathVariable(name = "userNo") int userNo) throws Exception {
		return service.getToursByUserNo(userNo);
	}

	// 신청한 투어 취소하기
	@DeleteMapping("/deleteTourCart/{utl_no}")
	public void deleteTourCart(@PathVariable(name = "utl_no") int utl_no) throws Exception {
		service.deleteTourCart(utl_no);
	}

	// 투어 결제하기
	@PostMapping("/tourOrder/save")
	public void saveTourOrderData(@RequestBody Map<String, Object> orderData) throws Exception {
		int userNo = Integer.parseInt(orderData.get("userNo").toString());
		List<Map<String, Object>> orderToursData = (List<Map<String, Object>>) orderData.get("orderItems");
		Map<String, Object> paymentData = (Map<String, Object>) orderData.get("payment");
		List<OrderTour> ordertours = orderToursData.stream().map(tourData -> {
			OrderTour ot = new OrderTour();
			ot.setM_no(userNo);
			ot.setT_no(Integer.parseInt(tourData.get("t_no").toString()));
			ot.setOt_price(Integer.parseInt(tourData.get("ot_price").toString()));
			return ot;
		}).collect(Collectors.toList());

		PaymentTour pt = new PaymentTour();
		pt.setPayt_type(convertPaymentType(paymentData.get("payt_type").toString()));
		pt.setPayt_total(Integer.parseInt(paymentData.get("payt_total").toString()));
		service.saveTourOrder(userNo, ordertours, pt);
	}

	// 투어 생성하기
	@PostMapping("/tourCreate")
	public ResponseEntity<?> createTour(@RequestParam("tourName") String tourName,
			@RequestParam("tourDescription") String tourDescription, @RequestParam("tourPrice") int tourPrice,
			@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate,
			@RequestParam("tourImageFile") MultipartFile tourImageFile,
			@RequestParam("categories") List<String> categories, @RequestParam("tours") String toursJson)
			throws Exception {

		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

		// 날짜 변환
		Date start = formatter.parse(startDate);
		Date end = formatter.parse(endDate);

		// 투어 객체 생성 및 초기화
		Tour tour = new Tour();
		tour.setT_title(tourName);
		tour.setT_explain(tourDescription);
		tour.setT_totalPrice(tourPrice);
		tour.setT_strDate(start);
		tour.setT_endDate(end);

		// 투어 데이터 저장
		int t_no = service.createTour(tour, categories, toursJson);

		// 투어 이미지 저장
		if (!tourImageFile.isEmpty()) {
			String folderPath = "D:/reactTest/daengTrip2/Front/public/images/tour/";
			String imagePath = folderPath + "tour_" + t_no + "_1.jpg";
			File folder = new File(folderPath);
			if (!folder.exists()) {
				folder.mkdirs(); // 디렉토리 생성
			}
			File dest = new File(imagePath);
			tourImageFile.transferTo(dest);
		}

		return ResponseEntity.ok("투어 등록 성공");
	}
	
	// 결제 타입 변환하기
	public int convertPaymentType(String payType) {
		switch (payType) {
		case "card/easy":
			return 0;
		case "trans":
			return 1;
		case "vbank":
			return 2;
		case "phone":
			return 3;
		default:
			throw new IllegalArgumentException("Invalid payment type: " + payType);
		}
	}
}