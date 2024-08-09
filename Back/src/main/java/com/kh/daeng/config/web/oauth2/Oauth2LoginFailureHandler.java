package com.kh.daeng.config.web.oauth2;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class Oauth2LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler{
	@Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        if (exception instanceof OAuth2AuthenticationException) {
        	System.err.println("exception at oauth2authentication");
            OAuth2AuthenticationException oAuth2Exception = (OAuth2AuthenticationException) exception;
            String redirectUrl =oAuth2Exception.getMessage();             
            getRedirectStrategy().sendRedirect(request, response, redirectUrl);
            
        } else if (exception instanceof AuthenticationException) {
        	System.err.println("exception at authentication");
        	AuthenticationException jwtException = (AuthenticationException) exception;
        	String redirectUrl = jwtException.getMessage();             
            getRedirectStrategy().sendRedirect(request, response, redirectUrl);
            
        } else {        	
        	super.onAuthenticationFailure(request, response, exception);
        }
    }
}
