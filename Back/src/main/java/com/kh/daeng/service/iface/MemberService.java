package com.kh.daeng.service.iface;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.MessagingException;

import com.kh.daeng.domain.dto.user.Dog;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.Preference;


public interface MemberService {
    boolean login(String email, String password);
    List<Member> getAllMembers();
    Member getMemberWithPreferences(int m_no);
    void deleteMember(int m_no);
    void registerMemberWithPreference(Member member, Preference preference, Dog dog);
    boolean authenticate(String userId, String password);
    Member findByEmail(String email);
    Member findByUserId(String userId);
    ResponseEntity<String> findPwdByUser(Map<String, String> user);
    void updateMemberPassword(Member member);
    void sendEmailForCertification(String email) throws NoSuchAlgorithmException, MessagingException, jakarta.mail.MessagingException;

	String findEmailByPhoneNumber(String phoneNumber);
}
