package com.kh.daeng.config.web.form;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.mapper.MemberMapper;


@Service
public class FormUserDetailsService implements UserDetailsService{
	private final MemberMapper memberMapper;
	public FormUserDetailsService(MemberMapper memberMapper) {
		this.memberMapper = memberMapper;
	}
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.err.println("user email: " + email);		
		Member member = memberMapper.findByUserEmail(email);
		if (member != null) {
			return new CustomUserDetails(member);
		}
        throw new UsernameNotFoundException("User not found with email: " + email);
	}
}
