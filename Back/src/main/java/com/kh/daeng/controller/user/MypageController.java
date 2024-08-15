package com.kh.daeng.controller.user;

import java.io.File;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.Preference;
import com.kh.daeng.service.iface.MypageService;

import lombok.extern.java.Log;

@Log
@RestController
@RequestMapping("/api/mypage")
public class MypageController {

	@Autowired
	private MypageService service;

	// 유저 정보 불러오기
	@GetMapping("/{userNo}")
	public Member getUser(@PathVariable(name = "userNo") int userNo) throws Exception {
		Member m = service.getUser(userNo);		
		System.err.println("member tourlist " + m.getTourList());
		return m;
	}

	// m_userId 업데이트
	@PostMapping("/updateUserId")
	public Member updateUserId(@RequestBody Map<String, Object> request) throws Exception {
		int userNo = Integer.parseInt(request.get("userNo").toString());
		String userId = (String) request.get("USERID");
		service.updateUserId(userNo, userId);
		return service.getUser(userNo);
	}

	// m_name 업데이트
	@PostMapping("/updateName")
	public Member updateName(@RequestBody Map<String, Object> request) throws Exception {
		int userNo = Integer.parseInt(request.get("userNo").toString());
		String name = (String) request.get("NAME");
		service.updateName(userNo, name);
		return service.getUser(userNo);
	}

	// m_phone 업데이트
	@PostMapping("/updatePhone")
	public Member updatePhone(@RequestBody Map<String, Object> request) throws Exception {
		int userNo = Integer.parseInt(request.get("userNo").toString());
		int phone = Integer.parseInt(request.get("PHONE").toString());
		service.updatePhone(userNo, phone);
		return service.getUser(userNo);
	}

	// m_postNo, m_detailAddress, m_basicAddress 업데이트
	@PostMapping("/updateAddress")
	public Member updateAddress(@RequestBody Map<String, Object> params) throws Exception {
		int userNo = Integer.parseInt(params.get("userNo").toString());
		String postNo = (String) params.get("POSTNO");
		String basicAddress = (String) params.get("BASICADDRESS");
		String detailAddress = (String) params.get("DETAILADDRESS");
		service.updateAddress(userNo, postNo, basicAddress, detailAddress);
		return service.getUser(userNo);
	}

	// d_name 업데이트
	@PostMapping("/updateDogName")
	public Member updateDogName(@RequestBody Map<String, Object> request) throws Exception {
		int userNo = Integer.parseInt(request.get("userNo").toString());
		String dogName = (String) request.get("DOGNAME");
		service.updateDogName(userNo, dogName);
		return service.getUser(userNo);
	}

	// d_breed 업데이트
	@PostMapping("/updateBreed")
	public Member updateBreed(@RequestBody Map<String, Object> params) throws Exception {
		int userNo = Integer.parseInt(params.get("userNo").toString());
		String breed = (String) params.get("BREED");
		service.updateBreed(userNo, breed);
		return service.getUser(userNo);
	}

	// d_size 업데이트
	@PostMapping("/updateDsize")
	public Member updateDsize(@RequestBody Map<String, Object> params) throws Exception {
		int userNo = Integer.parseInt(params.get("userNo").toString());
		int dsize = Integer.parseInt(params.get("DSIZE").toString());
		service.updateDsize(userNo, dsize);
		return service.getUser(userNo);
	}
	
	// 프로필 이미지 업데이트
	@PostMapping("/uploadProfileImage")
	public void uploadProfileImage(@RequestParam("image") MultipartFile file, @RequestParam("userNo") int userNo) throws Exception {
	    
	    // 프로필 이미지 변경
	    if (!file.isEmpty()) {
	        String folderPath = "C:/DaengTrip/Front/public/images/user/";
	        String imagePath = folderPath + "user_" + userNo + "_1.jpg";
	        File folder = new File(folderPath);
	        System.out.println(folderPath);
	        
	        boolean fileExists = false;

	        if (folder.exists() && folder.isDirectory()) {
	            File[] files = folder.listFiles((dir, name) -> name.startsWith("user_" + userNo + "_"));
	            if (files != null && files.length > 0) {
	                fileExists = true; // 이미 해당 유저의 파일이 존재
	            } else {
	                // 해당 유저의 파일이 없을 때
	                service.insertImg(userNo);
	            }
	        } else {
	            // 폴더가 존재하지 않으면 폴더를 생성하고 insertImg 호출
	            folder.mkdirs();
	            service.insertImg(userNo);
	        }
	        
	        File dest = new File(imagePath);
	        file.transferTo(dest);
	        System.out.println("프로필 이미지 변경 성공");
	    }
	}
	@PostMapping("/update/preference")
    public ResponseEntity<String> updatePf(@RequestBody Map<String,Object> newPf) {
		try {
			int mNo = (Integer)newPf.get("m_no");			
	        Preference preference = new Preference();

			Map<String, Boolean> preferences = (Map<String, Boolean>) newPf.get("preferences");
			preference.setPf_rest(preferences.get("pf_rest") ? 1 : 0);
	        preference.setPf_sport(preferences.get("pf_sport") ? 1 : 0);
	        preference.setPf_cafe(preferences.get("pf_cafe") ? 1 : 0);
	        preference.setPf_walk(preferences.get("pf_walk") ? 1 : 0);
	        preference.setPf_spot(preferences.get("pf_spot") ? 1 : 0);
	        int pno = service.getPfNo(mNo);
	        preference.setPf_no(pno);
			service.updatePf(preference);
			return ResponseEntity.ok("update success");
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("update fail");
		}
	}
}
