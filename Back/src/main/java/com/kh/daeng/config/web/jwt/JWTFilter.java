package com.kh.daeng.config.web.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.kh.daeng.config.web.form.CustomUserDetails;
import com.kh.daeng.domain.dto.user.Member;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
@Slf4j
public class JWTFilter extends OncePerRequestFilter {
	private final JWTUtil jwtUtil;

	public JWTFilter(JWTUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	@Override	
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {			
		System.err.println("in jwt filter from " +  request.getRequestURL());
		String accessToken = request.getHeader("authorization");				
		// token 없음
		if (accessToken == null || accessToken.equals("null")) {
			System.err.println("jwt access token null");
			filterChain.doFilter(request, response);
			return;
		}
		// 토큰 만료 O
		try {
			System.err.println("jwt access token check expired : " + accessToken);
			jwtUtil.isExpired(accessToken);
		} catch (ExpiredJwtException e) {
			System.err.println("access token is expired return 401 error");
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return;
		}		
		// 토큰 만료 X
		int userNo = jwtUtil.getUserNo(accessToken);
		String userName = jwtUtil.getUserName(accessToken);
		String role = jwtUtil.getRole(accessToken);
		Member member = new Member();
		member.setM_name(userName);
		member.setM_no(userNo);
		member.setM_role(role);
		
		System.err.println("jwt filter role " + role);
		
		CustomUserDetails customUserDetails = new CustomUserDetails(member);
		Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null,customUserDetails.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(authToken);

		System.err.println("jwt to next filter");
		filterChain.doFilter(request, response);
	}
}
