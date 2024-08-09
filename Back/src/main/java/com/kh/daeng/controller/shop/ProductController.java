package com.kh.daeng.controller.shop;

import java.io.File;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.daeng.controller.user.MemberController;
import com.kh.daeng.domain.dto.shop.Product;
import com.kh.daeng.service.iface.ProductService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class ProductController {
	@Autowired
	private ProductService service;
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

	@GetMapping("/api/product/{pdNo}")
	public Product selectProductByID(@PathVariable(name = "pdNo") int pdNo) throws Exception {
		Product product = service.selectProductDetail(pdNo);
		return product;
	}

	@RequestMapping("/api/admin/productList")
	public List<Product> selectProductList() throws Exception {
		logger.info("컨트롤러 selectProductList 진입");
		List<Product> list = service.selectProductList();
		return list;
	}
	
	@RequestMapping("/api/admin/productModify/{pd_no}")
	public Product selectProductDetail(@PathVariable(name = "pd_no") String pdNo) throws Exception {
		System.out.println(service.selectProductDetail(Integer.parseInt(pdNo)));
		Product product = service.selectProductDetail(Integer.parseInt(pdNo));
		return product;
	}

	@PostMapping("/api/admin/product/insert")
	public ResponseEntity<String> insertProduct(@RequestParam(name = "image", required = false) MultipartFile image,
			@RequestParam(name = "detailImages", required = false) MultipartFile[] detailImages,
			@ModelAttribute Product product, HttpServletRequest request) {
		try {
			int no = 0;
			int pdNo = service.getMaxPdNo();
			// 대표이미지
			if (image != null && !image.isEmpty()) {
				String filename = "product_" + pdNo + "_1.jpg";
				String path = "C:/DaengTrip/public/images/shop/"; // 로컬 파일 시스템 경로
				File directory = new File(path);
				if (!directory.exists()) {
					directory.mkdirs(); // 디렉토리 생성
				}
				File targetFile = new File(directory, filename);
				image.transferTo(targetFile);
				no += 1;
			}

			// 상세 이미지 처리
			if (detailImages != null && detailImages.length > 0) {
	            String path = "C:/DaengTrip/public/images/shop/"; // 로컬 파일 시스템 경로
	            File directory = new File(path);
	            if (!directory.exists()) {
	                directory.mkdirs(); // 디렉토리 생성
	            }

	            // 인덱스를 2로 시작하여 파일 이름을 지정
	            int index = 2;
	            for (MultipartFile file : detailImages) {
	                if (file != null && !file.isEmpty()) {
	                    String filename = "product_" + pdNo + "_" + index + ".jpg";
	                    File targetFile = new File(directory, filename);
	                    file.transferTo(targetFile);
	                    index++; // 다음 파일의 인덱스를 증가시킵니다.
	                    no += 1;
	                }
	            }
	        }

			service.insertProduct(product, no);
			return ResponseEntity.ok("성공");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류");
		}
	}
	
	@RequestMapping("/api/admin/product/update")
	public ResponseEntity<String> updateProduct(
	        @RequestParam(name = "image", required = false) MultipartFile image,
	        @RequestParam(name = "detailImages", required = false) MultipartFile[] detailImages,
	        @ModelAttribute Product product) {
	    try {
	        service.updateProduct(product, image, detailImages);
	        return ResponseEntity.ok("성공");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류");
	    }
	}

	@RequestMapping("/api/admin/product/delete")
	public void deleteProduct(@RequestParam(name = "pd_no") int pdNo) throws Exception {
		service.deleteProduct(pdNo);
	}
}
