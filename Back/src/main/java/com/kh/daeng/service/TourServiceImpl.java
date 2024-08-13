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
	public List<Tour> getMainTour() {
		return mapper.getMainTour();
	}

	// 투어 전체 리스트 불러오기
	@Override
	public List<Tour> getAllTours() throws Exception {
		return mapper.getAllTours();
	}

	// m_no를 이용하여 유저의 선호도 불러오기
	@Override
	public Preference getUserPre(int userNo) throws Exception {
		int pf_no = mapper.getUserPrNo(userNo);
		return mapper.getUserPre(pf_no);
	}

	// t_no를 이용하여 해당 투어의 상세정보 불러오기
	@Override
	public Tour getTourDetail(int t_no) throws Exception {
		return mapper.getTourDetail(t_no);
	}

	// m_no로 유저의 TourList 불러오기
	@Override
	public List<Integer> getUserTourList(int userNo) throws Exception {
		return mapper.getUserTourList(userNo);
	}

	// m_no와 t_no로 투어 신청하기
	@Override
	public void insertTourList(int userNo, int t_no) throws Exception {
		mapper.insertTourList(userNo, t_no);
	}
	
	// m_no와 t_no로 투어 신청 취소하기
	@Override
	public void deleteTourList(int userNo, int t_no) throws Exception {
		mapper.deleteTourList(userNo, t_no);
	}

	// admin 투어 승인하기
	@Override
	public void statusUpdata(int t_no) throws Exception {
		mapper.statusUpdate(t_no);
	}

	//admin 투어 삭제하기
	@Override
	public void deleteTour(int t_no) throws Exception {
		mapper.deleteTour(t_no);
	}

	// 신청한 투어 정보 불러오기
	@Override
	public List<Tour> getToursByUserNo(int userNo) throws Exception {
		return mapper.getToursByUserNo(userNo);
	}

	// 신청한 투어 취소하기
	@Override
	public void deleteTourCart(int utl_no) throws Exception {
		mapper.deleteTourCart(utl_no);
	}

	// 투어 결제하기
	@Override
	public void saveTourOrder(int userNo, List<OrderTour> ordertours, PaymentTour pt) throws Exception {
		mapper.insertPaymentTour(pt);
		int payt_No = mapper.getLatestPaymentTourId();

		for (OrderTour data : ordertours) {
			data.setPayt_no(payt_No);
			mapper.insertOrderTour(data);
		}
	}

	// 투어 생성하기
	@Override
	public int createTour(Tour tour, List<String> categories, String toursJson) throws Exception {
		
		// 선호도 생성
		// 값이 넘어온 선호도 항목 1로 바꾸어 DB 저장
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
		
		// 선호도 DB저장 
		mapper.insertPreference(preference);
		System.out.println("선호도 DB 저장 성공");
		
		// 투어 정보 저장
		int pf_no = mapper.getLastPreNo();				// 가장 최근 선호도 pf_no 불러오기
		System.out.println("선호도 pk 불러오기 성공");
		tour.setPf_no(pf_no);							// 불러온 선호도 pf_no tour 정보추가
		mapper.insertTour(tour);						// 투어 정보 DB 저장
		System.out.println("투어 저장 성공");
		
		
		// 투어 대표 이미지 저장			
		int t_no = mapper.getLastTourNo();				// 가장 최근 투어 t_no 불러오기
		System.out.println("투어 pk 불러오기 성공");
		
		mapper.insertImg(t_no, "tour", 1);				// 투어 대표이미지 DB 저장
		System.out.println("투어 대표이미지 DB 추가 성공");		
		
		// 호텔, 명소, 식당 정보 저장 (toursJson 파싱 및 이미지 저장)
		ObjectMapper op = new ObjectMapper();
		JsonNode rootNode = op.readTree(toursJson);		// 프론트엔드에서 넘어온 tours 파싱

		// 투어 상세 정보 저장
		int day = 1;
		for (JsonNode tourNode : rootNode) {

			// 호텔 정보 저장 (toursJson에서 호텔의 정보 불러오기)
			JsonNode hotelNode = tourNode.get("hotel");
			if (hotelNode != null) {
				// 호텔 정보 저장
				Hotel hotel = new Hotel();
				hotel.setH_name(hotelNode.get("name").asText());			// 호텔 이름 저장
				hotel.setT_no(t_no);										// 투어 t_no 저장
				String hotelPrice = hotelNode.get("price").asText();		// 호텔 가격 정보 불러오기
				String numberOnly = hotelPrice.replaceAll("[^\\d]", "");	// 숫자만 저장 
				hotel.setH_price(Integer.parseInt(numberOnly));				// 호텔 가격 저장
				
				hotel.setH_day(day);										// day 저장

				mapper.insertHotel(hotel);									// 호텔 정보 DB 저장									
				System.out.println("호텔 저장 성공");
				
				String hotelPhotoUrl = hotelNode.get("photo").asText();		// 호텔 사진 url 정보 불러오기
				int h_no = mapper.getLastHotelNo();							// 가장 최근 호텔 h_no 불러오기
				System.out.println("호텔 번호 불러오기 성공");	
				
				// 호텔 이미지 다운로드
				downloadImage(hotelPhotoUrl, "D:/reactTest/daengTrip2/Front/public/images/hotel/",
						"hotel_" + h_no + "_" + day + "_" + 1 + ".jpg");
				System.out.println("호텔 이미지 저장 성공");
				
				// 호텔 이미지 DB 저장
				TourImg ti = new TourImg();
//				ti.setT_no(t_no);											
				ti.setTi_ref_no(h_no);										// foreign key(h_no) 저장
				ti.setTi_category("hotel");									// 카테고리 저장
				ti.setTi_order(1);											// 사진 순서 저장(호텔은 day별로 하나씩만 존재 > 무조건 1로 설정)
				ti.setTi_day(day);											// day 저장	
				mapper.insertTourImg(ti);									// tourimg DB 저장
				System.out.println("호텔 DB 저장 성공");
			}
			
			// 장소 정보 저장
			JsonNode placesNode = tourNode.get("places");
			if (placesNode != null) {
				int placeIndex = 1;
				for (JsonNode placeNode : placesNode) {
					Place place = new Place();
					place.setT_no(t_no);									// 투어 t_no 저장
					place.setPl_name(placeNode.get("name").asText());		// 명소 이름 저장
					place.setPl_location(placeNode.get("address").asText());// 명소 주소 저장
					place.setPl_day(day);									// 명소 day 저장

					mapper.insertPlace(place);								// 명소 정보 DB 저장							
					System.out.println("장소 저장 성공");

					String placePhotoUrl = placeNode.get("photo").asText();	// 명소 사진 url 정보 불러오기
					int pl_no = mapper.getLastPlaceNo();					// 가장 최근 명소 pl_no 불러오기
					System.out.println("place pk 불러오기 성공");				
					
					// 명소 이미지 DB 저장
					downloadImage(placePhotoUrl, "D:/reactTest/daengTrip2/Front/public/images/place/",
							"place_" + pl_no + "_"  +  day + "_" + placeIndex + ".jpg");
					System.out.println("장소 이미지 저장 성공");
					
					TourImg ti = new TourImg();
//					ti.setT_no(t_no);
					ti.setTi_ref_no(pl_no);									// foreign key(pl_no) 저장
					ti.setTi_category("place");								// 카테고리 저장
					ti.setTi_order(placeIndex++);							// 사진 순서 저장
					ti.setTi_day(day);										// day 저장
					mapper.insertTourImg(ti);								// tourimg DB 저장
					System.out.println("장소 이미지 DB 저장 성공");
				}
			}
			// 레스토랑 정보 저장
			JsonNode resNode = tourNode.get("res");
			if (resNode != null) {
				int resIndex = 1;
				for (JsonNode resItemNode : resNode) {
					Place res = new Place();
					res.setT_no(t_no);										// 투어 t_no 저장
					res.setPl_name(resItemNode.get("name").asText());		// 식당 이름 저장
					res.setPl_location(resItemNode.get("address").asText());// 식당 주소 저장
					res.setPl_day(day);										// 식당 day 저장

					mapper.insertRes(res);									// 식당 정보 DB 저장
					System.out.println("식당 저장 성공");				

					String resPhotoUrl = resItemNode.get("photo").asText();	// 식장 사진 url 정보 불러오기 
					int res_no = mapper.getLastResNo();						// 가장 최근 식당 res_no 불러오기
					System.out.println("res pk 불러오기 성공");
					
					// 식당 이미지 DB 저장 성공
					downloadImage(resPhotoUrl, "D:/reactTest/daengTrip2/Front/public/images/res/",
							"res_" + res_no + "_"+ day + "_"  + resIndex + ".jpg");
					System.out.println("식당 이미지 저장 성공");
					
					TourImg ti = new TourImg();
//					ti.setT_no(t_no);
					ti.setTi_ref_no(res_no);								// foreign key(res_no) 저장							
					ti.setTi_category("res");								// 카테고리 저장
					ti.setTi_order(resIndex++);								// 사진 순서 저장
					ti.setTi_day(day);										// day 저장
					mapper.insertTourImg(ti);								// tourimg DB 저장
					System.out.println("식당이미지 DB 저장 성공");
				}
			}
			day++;
		}

		return t_no;
	}

	
	// 이미지 다운로드
	public void downloadImage(String imageUrl, String folderPath, String fileName) throws Exception {
		
		File file = new File(folderPath + fileName);				// 저장할 파일의 전체 경로를 지정하는 File 객체 생성
		file.getParentFile().mkdirs(); 								// 디렉토리 생성

		try (InputStream in = new URL(imageUrl).openStream();		// imageUrl로부터 데이터를 읽기 위한 InputStream
				ReadableByteChannel rbc = Channels.newChannel(in);	// InputStream을 ReadableByteChannel로 변환하여 바이트 단위로 데이터 읽기
				FileOutputStream fos = new FileOutputStream(file)) {// 다운로드한 이미지를 로컬 파일에 저장하기 위한 FileOutputStream 생성
			fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);	// ReadableByteChannel로부터 데이터를 읽어 FileOutputStream에 연결된 파일 채널에 기록(Long.MAX_VALUE는 가능한 최대 길이의 데이터를 전송함을 의미)
			System.out.println("Downloaded: " + file.getPath());
		}
	}


}
