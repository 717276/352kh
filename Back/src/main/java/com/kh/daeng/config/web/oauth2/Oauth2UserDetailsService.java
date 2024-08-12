package com.kh.daeng.config.web.oauth2;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.ibatis.binding.BindingException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.kh.daeng.config.web.form.CustomUserDetails;
import com.kh.daeng.domain.dto.user.Member;
import com.kh.daeng.mapper.MemberMapper;


@Service
public class Oauth2UserDetailsService extends DefaultOAuth2UserService{
	private final MemberMapper memberMapper;
	public Oauth2UserDetailsService(MemberMapper memberMapper) {
		this.memberMapper = memberMapper;
	}
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {	
		System.err.println("Oauth2UserDetails Service");
		OAuth2User oauth2 = super.loadUser(userRequest);
		
		String registrationId = userRequest.getClientRegistration().getRegistrationId();
		Oauth2Response oauth2Response = null;
		if (registrationId.equals("google")) {
			oauth2Response = new GoogleResponse(oauth2.getAttributes());
		} else if (registrationId.equals("naver")) {
			oauth2Response = new NaverResponse(oauth2.getAttributes());
		}
						
		Member member = memberMapper.findByUserEmail(oauth2Response.getEmail(),oauth2Response.getProvider());				
		if (member == null || !member.getM_provider().equals(oauth2Response.getProvider())) {
			try {
				String email = URLEncoder.encode(oauth2Response.getEmail(),"UTF-8");
				String name = URLEncoder.encode(oauth2Response.getName(),"UTF-8");
				String redirectUrl = "http://localhost:5173/register?email=" + email + "&name=" + name +"&provider=" + oauth2Response.getProvider();
				throw new OAuth2AuthenticationException(new OAuth2Error("user_not_found"), redirectUrl);
			}catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}			
		}
		return new CustomUserDetails(member, oauth2Response);
	}
}
