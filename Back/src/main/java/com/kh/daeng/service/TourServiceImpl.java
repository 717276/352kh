package com.kh.daeng.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.daeng.domain.dto.user.OrderTour;
import com.kh.daeng.domain.dto.user.PaymentTour;
import com.kh.daeng.domain.dto.user.Preference;

import com.kh.daeng.domain.dto.tour.Hotel;
import com.kh.daeng.domain.dto.tour.Place;
import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.domain.dto.tour.TourImg;
import com.kh.daeng.mapper.TourMapper;
import com.kh.daeng.service.iface.TourService;

@Service
public class TourServiceImpl implements TourService {

	@Autowired
	private TourMapper mapper;

	@Override
	public List<Tour> getAllTours() throws Exception {
		return mapper.getAllTours();
	}

	@Override
	public Preference getUserPre(int userNo) throws Exception {
		int pf_no = mapper.getUserPrNo(userNo);
		return mapper.getUserPre(pf_no);
	}

	@Override
	public Tour getTourDetail(int t_no) throws Exception {
		return mapper.getTourDetail(t_no);
	}

	@Override
	public List<Integer> getUserTourList(int userNo) throws Exception {
		return mapper.getUserTourList(userNo);
	}

	@Override
	public void insertTourList(int userNo, int t_no) throws Exception {
		mapper.insertTourList(userNo, t_no);
	}
	
	@Override
	public void deleteTourList(int userNo, int t_no) throws Exception {
		mapper.deleteTourList(userNo, t_no);
	}

	@Override
	public void statusUpdata(int t_no) throws Exception {
		mapper.statusUpdate(t_no);
	}

	@Override
	public void deleteTour(int t_no) throws Exception {
		mapper.deleteTour(t_no);
	}

	@Override
	public List<Tour> getToursByUserNo(int userNo) throws Exception {
		return mapper.getToursByUserNo(userNo);
	}

	@Override
	public void deleteTourCart(int utl_no) throws Exception {
		mapper.deleteTourCart(utl_no);
	}

	@Override
	public void saveTourOrder(int userNo, List<OrderTour> ordertours, PaymentTour pt) throws Exception {
		mapper.insertPaymentTour(pt);
		int payt_No = mapper.getLatestPaymentTourId();

		for (OrderTour data : ordertours) {
			data.setPayt_no(payt_No);
			mapper.insertOrderTour(data);
		}
	}

	@Override
	public int createTour(Tour tour, List<String> categories, String toursJson) throws Exception {
		// 선호도 생성
		Preference preference = new Preference();
		for (String category : categories) {
			switch (category) {
			case "pf_rest":
				preference.setPf_rest(1);
				break;
			case "pf_sport":
				preference.setPf_sport(1);
				break;
			case "pf_walk":
				preference.setPf_walk(1);
				break;
			case "pf_cafe":
				preference.setPf_cafe(1);
				break;
			case "pf_spot":
				preference.setPf_spot(1);
				break;
			}
		}
		mapper.insertPreference(preference);
		System.out.println("선호도 저장 성공");
		int pf_no = mapper.getLastPreNo();
		System.out.println("선호도 pk 불러오기 성공");
//		// 투어 데이터 저장 로직 (생략)
		
		tour.setPf_no(pf_no);
		mapper.insertTour(tour);
		System.out.println("투어 저장 성공");
		
		int t_no = mapper.getLastTourNo();
		System.out.println("투어 pk 불러오기 성공");
		
		mapper.insertImg(t_no, "tour", 1);
		System.out.println("투어 대표이미지 DB 추가 성공");
		// toursJson 파싱 및 이미지 저장
		ObjectMapper op = new ObjectMapper();
		JsonNode rootNode = op.readTree(toursJson);


		int day = 1;
		for (JsonNode tourNode : rootNode) {

			// 호텔 정보 저장
			JsonNode hotelNode = tourNode.get("hotel");
			if (hotelNode != null) {
				Hotel hotel = new Hotel();
				hotel.setH_name(hotelNode.get("name").asText());
				hotel.setT_no(t_no);
				String hotelPrice = hotelNode.get("price").asText();
				String numberOnly = hotelPrice.replaceAll("[^\\d]", "");
				hotel.setH_price(Integer.parseInt(numberOnly));
				
				hotel.setH_day(day);
				
				String hotelPhotoUrl = hotelNode.get("photo").asText();
				mapper.insertHotel(hotel);
				System.out.println("호텔 저장 성공");
				int h_no = mapper.getLastHotelNo();
				System.out.println("호텔 번호 불러오기 성공");
				downloadImage(hotelPhotoUrl, "C:/DaengTrip/public/images/tourimg/hotel/",
						"hotel_" + h_no + "_" + day + "_" + 1 + ".jpg");
				System.out.println("호텔 이미지 저장 성공");
				TourImg ti = new TourImg();
				ti.setT_no(t_no);
				ti.setTi_ref_no(h_no);
				ti.setTi_category("hotel");
				ti.setTi_order(1);
				ti.setTi_day(day);
				
				mapper.insertTourImg(ti);
				System.out.println("호텔 DB 저장 성공");
			}
			// 장소 정보 저장
			JsonNode placesNode = tourNode.get("places");
			if (placesNode != null) {
				int placeIndex = 1;
				for (JsonNode placeNode : placesNode) {
					Place place = new Place();
					place.setT_no(t_no);
					place.setPl_name(placeNode.get("name").asText());
					place.setPl_location(placeNode.get("address").asText());
					place.setPl_day(day);

					String placePhotoUrl = placeNode.get("photo").asText();
					mapper.insertPlace(place);
					System.out.println("장소 저장 성공");
					int pl_no = mapper.getLastPlaceNo();
					System.out.println("place pk 불러오기 성공");
					downloadImage(placePhotoUrl, "C:/DaengTrip/public/images/tourimg/place/",
							"place_" + pl_no + "_"  +  day + "_" + placeIndex + ".jpg");
					System.out.println("장소 이미지 저장 성공");
					
					TourImg ti = new TourImg();
					ti.setT_no(t_no);
					ti.setTi_ref_no(pl_no);
					ti.setTi_category("place");
					ti.setTi_order(placeIndex++);
					ti.setTi_day(day);
					mapper.insertTourImg(ti);
					System.out.println("장소 이미지 DB 저장 성공");
				}
			}
			// 레스토랑 정보 저장
			JsonNode resNode = tourNode.get("res");
			if (resNode != null) {
				int resIndex = 1;
				for (JsonNode resItemNode : resNode) {
					Place res = new Place();
					res.setT_no(t_no);
					res.setPl_name(resItemNode.get("name").asText());
					res.setPl_location(resItemNode.get("address").asText());
					res.setPl_day(day);

					String resPhotoUrl = resItemNode.get("photo").asText();
					mapper.insertRes(res);
					System.out.println("식당 저장 성공");
					int res_no = mapper.getLastResNo();
					System.out.println("res pk 불러오기 성공");
					downloadImage(resPhotoUrl, "C:/DaengTrip/public/images/tourimg/res/",
							"res_" + res_no + "_"+ day + "_"  + resIndex + ".jpg");
					
					System.out.println("식당 이미지 저장 성공");
					
					TourImg ti = new TourImg();
					ti.setT_no(t_no);
					ti.setTi_ref_no(res_no);
					ti.setTi_category("res");
					ti.setTi_order(resIndex++);
					ti.setTi_day(day);
					mapper.insertTourImg(ti);
					System.out.println("식당이미지 DB 저장 성공");
				}
			}
			day++;
		}

		return t_no;
	}

	public void downloadImage(String imageUrl, String folderPath, String fileName) throws Exception {
		File file = new File(folderPath + fileName);
		file.getParentFile().mkdirs(); // 디렉토리 생성

		try (InputStream in = new URL(imageUrl).openStream();
				ReadableByteChannel rbc = Channels.newChannel(in);
				FileOutputStream fos = new FileOutputStream(file)) {
			fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
			System.out.println("Downloaded: " + file.getPath());
		}
	}


}
