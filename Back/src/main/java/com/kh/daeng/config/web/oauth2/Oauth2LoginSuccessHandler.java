package com.kh.daeng.config.web.oauth2;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.kh.daeng.config.web.form.CustomUserDetails;
import com.kh.daeng.config.web.jwt.JWTUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class Oauth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler{

	private final JWTUtil jwtUtil;
	public Oauth2LoginSuccessHandler(JWTUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
		CustomUserDetails cuds = (CustomUserDetails)authentication.getPrincipal();
		int userNo = cuds.getUserNo();
		
		Collection<?extends GrantedAuthority> authorities = cuds.getAuthorities();
		Iterator<?extends GrantedAuthority> iterator = authorities.iterator();
		GrantedAuthority auth = iterator.next();
		String role = auth.getAuthority();
		
		String accessToken = jwtUtil.createJwt("access", userNo, role, 600 * 1000L);
		String refreshToken = jwtUtil.createJwt("refresh", userNo, role, 86400000L);
		
		response.setHeader("authorization", accessToken);
		response.addCookie(createCookie("refresh", refreshToken));		
		response.setStatus(HttpStatus.OK.value());
		
	    response.sendRedirect("http://localhost:5173/");
	}
	private Cookie createCookie(String key, String value) {
		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(60 * 60 * 60);
		cookie.setPath("/");
		cookie.setHttpOnly(true);
		return cookie;
	}
}
