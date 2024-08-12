package com.kh.daeng.config.web.handler;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

//	@Override
//	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
//			AuthenticationException exception) throws IOException, ServletException {
//		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//		super.onAuthenticationFailure(request, response, r);
//	}

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		System.err.println("custom access denined hadler");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);                
	}
}
