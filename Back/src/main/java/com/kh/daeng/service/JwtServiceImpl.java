package com.kh.daeng.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.kh.daeng.config.web.jwt.JWTUtil;
import com.kh.daeng.domain.dto.web.Refresh;
import com.kh.daeng.mapper.RefreshMapper;

import io.jsonwebtoken.ExpiredJwtException;
import io.opentelemetry.exporter.logging.SystemOutLogRecordExporter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class JwtServiceImpl {
	@Autowired
	private JWTUtil jwtUtil;
	@Autowired
	private RefreshMapper refreshMapper;
	
	public ResponseEntity<?> work(HttpServletRequest request, HttpServletResponse response){
		System.out.println("in refresh service");		
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
            }
        }

        if (refresh == null) {
        	System.out.println("refersh is null");
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }
        //expired check
        try {
        	
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {        
            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }

        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }
        
        int userNo = jwtUtil.getUserNo(refresh);
        String role = jwtUtil.getRole(refresh);

        String newAccess = jwtUtil.createJwt("access", userNo, role, 600000L);
        String newRefresh = jwtUtil.createJwt("refresh", userNo, role, 86400000L);
        
        refreshMapper.deleteByRefresh(refresh);
    	addRefreshEntity(userNo, newRefresh, 86400000L);
    		
        //response
    	System.out.println("send refresh token");
        response.setHeader("authorization", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));

        return new ResponseEntity<>(HttpStatus.OK);
	}
	private Cookie createCookie(String key, String value) {

	    Cookie cookie = new Cookie(key, value);
	    cookie.setMaxAge(24*60*60);
	    //cookie.setSecure(true);
	    //cookie.setPath("/");
	    cookie.setHttpOnly(true);

	    return cookie;
	}
	private void addRefreshEntity(int userNo, String refresh, Long expiredMs) {

	    Date date = new Date(System.currentTimeMillis() + expiredMs);

	    Refresh refreshEntity = new Refresh();
	    refreshEntity.setUserNo(userNo);
	    refreshEntity.setRefresh(refresh);
	    refreshEntity.setExpiration(date.toString());

	    refreshMapper.save(refreshEntity);
	}
}
