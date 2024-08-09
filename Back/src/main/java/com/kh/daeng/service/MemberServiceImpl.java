package com.kh.daeng.service;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.MessagingException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.kh.daeng.config.util.CertificationGenerator;
import com.kh.daeng.config.web.jwt.JWTUtil;
import com.kh.daeng.domain.dto.user.Dog;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.Preference;
import com.kh.daeng.mapper.MemberMapper;
import com.kh.daeng.service.iface.MemberService;

import jakarta.mail.internet.MimeMessage;

@Service
public class MemberServiceImpl implements MemberService {

    private static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);
    private static final PreferenceServiceImpl impl = new PreferenceServiceImpl();
    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private CertificationGenerator generator;

    @Override
    public List<Member> getAllMembers() {
        List<Member> members = memberMapper.selectAllMembers();
        if (members != null && !members.isEmpty()) {
            for (Member member : members) {
                logger.info("Member ID: " + member.getM_userId());
                logger.info("Member Name: " + member.getM_name());
            }
        } else {
            logger.info("No members found.");
        }
        return members;
    }

    @Override
    public Member getMemberWithPreferences(int m_no) {
        Member member = memberMapper.selectMemberWithPreferences(m_no);
        if (member != null) {
            Preference preference = impl.getAllprePreferences().stream()
                    .filter(p -> p.getPf_no() == member.getM_no())
                    .findFirst()
                    .orElse(null);
            if (preference != null) {
                member.setPreference(preference);
            }
        }
        return member;
    }

    @Override
    public Member findByUserId(String userId) {
        return memberMapper.findByUserId(userId);
    }

    @Override
    public void deleteMember(int m_no) {
        logger.info("dele impl 진입, m_no : " + m_no );
        memberMapper.deleteMember(m_no);
    }

    @Override
    public void registerMemberWithPreference(Member member, Preference preference, Dog dog) {
        logger.info("impl진입" );
        logger.info("Member Name: " + member.getM_name());
        logger.info("Prefer: " + preference.toString());
        logger.info("Dog: " + dog.toString());
        memberMapper.registerMemberWithPreference(member, preference, dog);
    }

    @Override
    public boolean authenticate(String userId, String password) {
        Member member = memberMapper.findByUserId(userId);
        return member != null && member.getM_password().equals(password);
    }

    @Override
    public Member findByEmail(String email) {
        return memberMapper.findByUserEmail(email);
    }

    @Override
    public boolean login(String email, String password) {
        int count = memberMapper.checkLoginExistence(email, password);
        Member member = memberMapper.login(email , password);
        return member != null;
    }

    @Override
    public ResponseEntity<String> findPwdByUser(Map<String, String> user) {
        Member member = findByEmail(user.get("userEmail"));
        if (member != null) {
            String dbUserTel = "0" + member.getM_phone(); // DB에서 email로 검색, DB에서 email이 있으면
            String inputTel = user.get("userTel"); // input tel과 DB tel을 비교

            if (dbUserTel.equals(inputTel)) {
                // CompletableFuture를 사용하여 비동기적으로 메일 전송
                CompletableFuture.runAsync(() -> {
                    try {
                        sendEmailForCertification(user.get("userEmail"));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });

                // 메일 전송이 완료되기를 기다리지 않고 즉시 응답을 보냄
                return ResponseEntity.ok("메일 전송함");
            } else {
                return ResponseEntity.status(404).body("전화번호가 일치하지 않습니다."); // DB에 email이 있으나, input tel과 DB tel이 다를 경우
            }
        } else {
            return ResponseEntity.status(404).body("해당 이메일이 존재하지 않습니다."); // DB에 email 없을 때
        }
    }
    

    @Override
    public String findEmailByPhoneNumber(String phoneNumber) {
       
        Member member = memberMapper.findByPhoneNumber(phoneNumber);
        		
       
            return member.getM_email();
        
        
    }
    @Override
    public void updateMemberPassword(Member member) {
        memberMapper.updateMemberPassword(member);
    }

    @Override
    public void sendEmailForCertification(String email) throws NoSuchAlgorithmException, MessagingException, jakarta.mail.MessagingException {
        // 비밀번호 생성
        String certificationNumber = generator.createCertificationNumber();

        String content = String.format("임시비밀번호: %s <br><br> 로그인 후 마이페이지에서 비밀번호를 수정해주세요.", certificationNumber);

        // DB에 비밀번호 저장
        Member member = findByEmail(email);
        if (member != null) {
            member.setM_password(certificationNumber); // 임시 비밀번호 설정 (암호화는 다른 곳에서 처리)
            updateMemberPassword(member); // 변경된 비밀번호를 DB에 저장
        }

        // 이메일 전송
        sendMail(email, content);
    }

    private void sendMail(String email, String content) throws MessagingException, jakarta.mail.MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        helper.setTo(email);
        helper.setSubject("DaengTrip 비밀번호 변경 메일");
        helper.setText(content, true); // HTML 내용 전달

        mailSender.send(mimeMessage);
    }

	

	
}
