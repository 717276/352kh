package com.kh.daeng.config.web.handler;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		System.err.println("custom access denined hadler");
//        response.setStatus(HttpServletResponse.SC_FORBIDDEN);        
//        System.err.println("Access Denied Handler invoked");
//        System.err.println("Request URI: " + request.getRequestURI());
//        System.err.println("Request Method: " + request.getMethod());
//        System.err.println("Request Headers: ");
//        request.getHeaderNames().asIterator().forEachRemaining(headerName -> 
//            System.err.println(headerName + ": " + request.getHeader(headerName))
//        );        
//        System.err.println("access denied handler " + request);        
	}

}
