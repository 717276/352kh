package com.kh.daeng.config.web.form;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import com.kh.daeng.config.web.jwt.JWTUtil;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class LogoutFilter extends GenericFilterBean {
	private final JWTUtil jwtUtil;
	
	public LogoutFilter(JWTUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);	
	}
	private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException{
		String requestUri = request.getRequestURI();
		// logout 아니면 다음으로
		if(!requestUri.matches("^\\/logout$")) {
			filterChain.doFilter(request, response);
			return;
		}
		// POST 요청이 아니면 다음으로
		String requestMethod = request.getMethod();
		if (!requestMethod.equals("POST")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		String refreshToken = null;
		Cookie[] cookies = request.getCookies();
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals("refresh")) {
				refreshToken = cookie.getValue();
			}
		}
		// 
		if (refreshToken == null) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
		}
		// 토큰 만료
		try {
			jwtUtil.isExpired(refreshToken);
		}catch(ExpiredJwtException e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
		}
		//----------------------------------
        // 전달된 토큰의 내용이 실제 refresh 인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refreshToken);
        if (!category.equals("refresh")) {
            //response status code
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        //DB에 저장되어 있는지 확인
//        Boolean isExist = refreshRepository.existsByRefresh(refresh);
//        if (!isExist) {
//            //response status code
//            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//            return;
//        }

        //로그아웃 진행
        //Refresh 토큰 DB에서 제거
//        refreshRepository.deleteByRefresh(refresh);

        //Refresh 토큰 Cookie 값 0
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
        System.out.println("Logout success");
	}
	
}
