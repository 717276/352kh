package com.kh.daeng.controller.user;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.daeng.domain.dto.user.Dog;
import com.kh.daeng.domain.dto.user.Preference;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.service.iface.DogService;
import com.kh.daeng.service.iface.MemberService;
import com.kh.daeng.service.iface.PreferenceService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberService memberService;
    @Autowired
    private PreferenceService preferenceService;
    @Autowired
    private DogService dogService;

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
    
    @GetMapping
    public List<Member> getAllMembers() {
        System.out.println("회원출력");
        return memberService.getAllMembers();
    }

    @GetMapping("/{m_no}")
    public Member getMemberWithPreferences(@PathVariable("m_no") int m_no) {
        return memberService.getMemberWithPreferences(m_no);
    }

    @DeleteMapping("/delete/{m_no}")
    public void deleteMember(@PathVariable("m_no") int m_no) {
        memberService.deleteMember(m_no);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, Object> userInfo) {
        return ResponseEntity.ok("User registration step 1 completed");
    }

    @PostMapping("/finalizeRegistration")
    public ResponseEntity<String> finalizeRegistration(@RequestBody Map<String, Object> userInfo) {
        Preference preference = new Preference();
        Map<String, Boolean> preferences = (Map<String, Boolean>) userInfo.get("preferences");
        preference.setPf_rest(preferences.get("pf_rest") ? 1 : 0);
        preference.setPf_sport(preferences.get("pf_sport") ? 1 : 0);
        preference.setPf_cafe(preferences.get("pf_cafe") ? 1 : 0);
        preference.setPf_walk(preferences.get("pf_walk") ? 1 : 0);
        preference.setPf_spot(preferences.get("pf_spot") ? 1 : 0);
        logger.info("Preference Info: {}", preference);
        
        Member member = new Member();
        member.setM_userId(userInfo.get("userId").toString());
        member.setM_name(userInfo.get("username").toString());
        member.setM_email(userInfo.get("email").toString());
        member.setM_password(userInfo.get("password").toString());
        member.setM_phone(Integer.parseInt(userInfo.get("phoneNumber").toString()));
        member.setM_basicAddress(userInfo.get("address").toString());
        member.setM_detailAddress(userInfo.get("detailedAddress").toString());
        member.setM_postNo(userInfo.get("zonecode").toString());

        Dog dog = new Dog();
        dog.setD_breed(userInfo.get("breed").toString());
        dog.setD_name(userInfo.get("dogName").toString());
        dog.setD_size(Integer.parseInt(userInfo.get("size").toString()));

        logger.info("Member Info: {}", member);

        memberService.registerMemberWithPreference(member, preference, dog);

        return ResponseEntity.ok("User registered successfully");
    }

 // 휴대전화, 이메일로 비밀번호 찾기
    @PostMapping("/find_password")
    public ResponseEntity<String> findPwd(@RequestBody Map<String, String> user) {
        System.out.println(user.get("userEmail"));  // 값 잘 넘어왔는지 체크한 거라, 없어도 됨
        System.out.println(user.get("userTel"));    // 값 잘 넘어왔는지 체크한 거라, 없어도 됨
        
        return memberService.findPwdByUser(user);
        //return memberService.findPwdByUser(user);
    }
    @PostMapping("/find_email")
    public ResponseEntity<Map<String, String>> findEmailByPhoneNumber(@RequestBody Map<String, String> request) {
        String userTel = request.get("userTel");
        String email = memberService.findEmailByPhoneNumber(userTel);

        Map<String, String> response = new HashMap<>();
        if (email != null) {
            response.put("userEmail", email);
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "해당 전화번호로 등록된 이메일을 찾을 수 없습니다.");
            return ResponseEntity.status(404).body(response);
        }
    }

    @GetMapping("/checkId/{userId}")
    public ResponseEntity<Map<String, String>> checkIdDuplicate(@PathVariable("userId") String userId) {
        logger.info("진입");
        logger.info("진입"+userId);
        Member existingMember = memberService.findByUserId(userId);
    
        Map<String, String> response = new HashMap<>();
        if (existingMember != null) {
            response.put("message", "중복된 아이디입니다.");
            return ResponseEntity.status(409).body(response);
        } else {
            response.put("message", "사용 가능한 아이디입니다.");
            return ResponseEntity.ok(response);
        }
    }   
}
