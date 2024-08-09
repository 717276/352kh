package com.kh.daeng.controller.user;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.service.iface.MypageService;

import lombok.extern.java.Log;

@Log
@RestController
@RequestMapping("/api/mypage")
public class MypageController {

	@Autowired
	private MypageService service;

	@GetMapping("/{userNo}")
	public Member getUser(@PathVariable(name = "userNo") int userNo) throws Exception {
		return service.getUser(userNo);
	}

	@PostMapping("/updateUserId")
	public Member updateUserId(@RequestBody Map<String, Object> request) throws Exception {
		int userNo = Integer.parseInt(request.get("userNo").toString());
		String userId = (String) request.get("USERID");
		service.updateUserId(userNo, userId);
		return service.getUser(userNo);
	}

	@PostMapping("/updateName")
	public Member updateName(@RequestBody Map<String, Object> request) throws Exception {
		int userNo = Integer.parseInt(request.get("userNo").toString());
		String name = (String) request.get("NAME");
		service.updateName(userNo, name);
		return service.getUser(userNo);
	}

	@PostMapping("/updatePhone")
	public Member updatePhone(@RequestBody Map<String, Object> request) throws Exception {
		int userNo = Integer.parseInt(request.get("userNo").toString());
		int phone = Integer.parseInt(request.get("PHONE").toString());
		service.updatePhone(userNo, phone);
		return service.getUser(userNo);
	}

	@PostMapping("/updateAddress")
	public Member updateAddress(@RequestBody Map<String, Object> params) throws Exception {
		int userNo = Integer.parseInt(params.get("userNo").toString());
		String postNo = (String) params.get("POSTNO");
		String basicAddress = (String) params.get("BASICADDRESS");
		String detailAddress = (String) params.get("DETAILADDRESS");
		service.updateAddress(userNo, postNo, basicAddress, detailAddress);
		return service.getUser(userNo);
	}

	@PostMapping("/updateDogName")
	public Member updateDogName(@RequestBody Map<String, Object> request) throws Exception {
		int userNo = Integer.parseInt(request.get("userNo").toString());
		String dogName = (String) request.get("DOGNAME");
		service.updateDogName(userNo, dogName);
		return service.getUser(userNo);
	}

	@PostMapping("/updateBreed")
	public Member updateBreed(@RequestBody Map<String, Object> params) throws Exception {
		int userNo = Integer.parseInt(params.get("userNo").toString());
		String breed = (String) params.get("BREED");
		service.updateBreed(userNo, breed);
		return service.getUser(userNo);
	}

	@PostMapping("/updateDsize")
	public Member updateDsize(@RequestBody Map<String, Object> params) throws Exception {
		int userNo = Integer.parseInt(params.get("userNo").toString());
		int dsize = Integer.parseInt(params.get("DSIZE").toString());
		service.updateDsize(userNo, dsize);
		return service.getUser(userNo);
	}
}
