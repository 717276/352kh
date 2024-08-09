package com.kh.daeng.config.web.form;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.kh.daeng.config.web.oauth2.Oauth2Response;
import com.kh.daeng.domain.dto.user.Member;

public class CustomUserDetails implements UserDetails, OAuth2User{
	private final Member member;	
	private final Oauth2Response oauth2Response;
	
	public CustomUserDetails(Member member) {
		this.member = member;
		this.oauth2Response = null;		
	}	
	public CustomUserDetails(Member member, Oauth2Response oauth2Response) {
		this.member = member;
		this.oauth2Response = oauth2Response;		
	}
	
	@Override
	public Map<String, Object> getAttributes() {
		return null;
	}

	@Override
	public String getName() {
		return null;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collection = new ArrayList<>();
		collection.add(new GrantedAuthority() {
			@Override
			public String getAuthority() {
				return member.getM_role();
			}			
		});
		return collection;
	}
	public int getUserNo() {
		return member.getM_no();
	}
	
	@Override
	public String getPassword() {
		return member.getM_password();
	}

	@Override
	public String getUsername() {
		return member.getM_email();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
