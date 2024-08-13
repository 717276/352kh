package com.kh.daeng.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kh.daeng.domain.dto.user.Dog;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.domain.dto.user.Preference;

@Mapper
public interface MemberMapper {
	List<Member> selectAllMembers();

	Member selectMemberWithPreferences(@Param("m_no") int m_no);

	void deleteMember(@Param("m_no") int m_no);

	// 새로운 메서드 정의
	int join(Member member);
	 Member login(@Param("email")String email, @Param("password")String password);
	void registerMemberWithPreference(@Param("member") Member member, @Param("preference") Preference preference,
			@Param("dog") Dog dog);
	 Member findByUserId(@Param("m_userId") String m_userId);
	 int checkLoginExistence(@Param("email") String email, @Param("password") String password);
	 Member findByUserEmail(@Param("email")String email , @Param("provider")String provider);
	 void updateMemberPassword(Member member);

	Member findByPhoneNumber(@Param("m_phone") String m_phone);
}

