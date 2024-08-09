package com.kh.daeng.controller.tour;

import java.util.List;

import org.openqa.selenium.TimeoutException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.daeng.config.util.Crawling;
import com.kh.daeng.domain.dto.tour.Crawl;

@RestController
public class BuildController {
	@Autowired
	private Crawling crawling;
	@PostMapping("/api/hotel")
	public ResponseEntity<?> getHotelData(@RequestParam("strDate") String str  , @RequestParam("endDate") String end,  @RequestParam("region") String region){		
		List<Crawl> hotelData;
		try {
			hotelData = crawling.process(region, str, end, 1, 0, 0);
		} catch (TimeoutException e) {
			System.err.println("controller response bad request");
			return ResponseEntity.badRequest().body("지역 다시 입력");			
		}finally {			
			crawling.driver.quit();		
		}
		return ResponseEntity.ok(hotelData);
	}
}
