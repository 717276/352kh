package com.kh.daeng.config.web.oauth2;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationManagerResolver;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public class Oauth2Filter extends AbstractAuthenticationProcessingFilter {

	public Oauth2Filter(RequestMatcher requiresAuthenticationRequestMatcher, AuthenticationManager authenticationManager) {
        super(requiresAuthenticationRequestMatcher);
        setAuthenticationManager(authenticationManager);
    }

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		log.info("oauth2Fitler : " + httpRequest.getRequestURI());
		if (httpRequest.getRequestURI().equals("/error")) {
			System.err.println(httpResponse.getStatus());			
		}
		if (httpRequest.getRequestURI().startsWith("/oauth2/authorization")) {
			log.info("oauth2/authorization");
			try {
				Authentication authResult = attemptAuthentication(httpRequest, httpResponse);				
				if (authResult != null) {
					SecurityContextHolder.getContext().setAuthentication(authResult);
				}
				chain.doFilter(request, response);
			} catch (AuthenticationException e) {
				SecurityContextHolder.clearContext();
				httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed: " + e.getMessage());
				return;
			}
		} else {
			log.info("next");
			chain.doFilter(request, response);
		}
	}
}
