package com.kh.daeng.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.kh.daeng.config.web.auth.AccessManager;
import com.kh.daeng.config.web.auth.Voter;
import com.kh.daeng.config.web.form.FormAuthenticationProvider;
import com.kh.daeng.config.web.form.LoginFilter;
import com.kh.daeng.config.web.form.LogoutFilter;
import com.kh.daeng.config.web.handler.CustomAccessDeniedHandler;
import com.kh.daeng.config.web.jwt.JWTFilter;
import com.kh.daeng.config.web.jwt.JWTUtil;
import com.kh.daeng.config.web.oauth2.Oauth2LoginFailureHandler;
import com.kh.daeng.config.web.oauth2.Oauth2LoginSuccessHandler;
import com.kh.daeng.config.web.oauth2.Oauth2UserDetailsService;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	private final AuthenticationConfiguration authenticationConfiguration;

	private Oauth2UserDetailsService oauth2UserDetailsService;
	private Oauth2LoginSuccessHandler oauth2LoginSuccessHandler;
	private Oauth2LoginFailureHandler oauth2LoginFailureHandler;
	private CustomAccessDeniedHandler customAccessDeniedHandler;
	private JWTUtil jwtUtil;
		
	public SecurityConfig(AuthenticationConfiguration authenticationConfiguration,
			Oauth2UserDetailsService oauth2UserDetailsService, Oauth2LoginSuccessHandler oauth2LoginSuccessHandler,
			Oauth2LoginFailureHandler oauth2LoginFailureHandler, JWTUtil jwtUtil,
			CustomAccessDeniedHandler customAccessDeniedHandler) {
		this.oauth2UserDetailsService = oauth2UserDetailsService;
		this.oauth2LoginSuccessHandler = oauth2LoginSuccessHandler;
		this.oauth2LoginFailureHandler = oauth2LoginFailureHandler;
		this.authenticationConfiguration = authenticationConfiguration;
		this.jwtUtil = jwtUtil;
		this.customAccessDeniedHandler = customAccessDeniedHandler;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	public AuthenticationProvider customAuthenticationProvider() {
		return new FormAuthenticationProvider();
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AccessDecisionManager accessManager() {
		return new AccessManager(Arrays.asList(new Voter()));
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors((cors) -> cors.configurationSource(new CorsConfigurationSource() {
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

				CorsConfiguration configuration = new CorsConfiguration();

				configuration.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
				configuration.setAllowedMethods(Collections.singletonList("*"));
				configuration.setAllowCredentials(true);
				configuration.setAllowedHeaders(Collections.singletonList("*"));
				configuration.setMaxAge(3600L);		        
				configuration.setExposedHeaders(Collections.singletonList("Authorization"));
				return configuration;
			}
		}));
		
		http.csrf(csrf -> csrf.disable());
		http.formLogin((login) -> login.disable());

		http.authorizeHttpRequests((auth) -> auth.requestMatchers("/", "/login", "/reissue","/api/**").permitAll()
				.requestMatchers("/build").hasRole("USER")
				.requestMatchers("/admin/**").hasRole("ADMIN")						
				).exceptionHandling(exceptionHandling -> 
					exceptionHandling.accessDeniedHandler(customAccessDeniedHandler)); // Custom handler for access denied
        
											
		http.oauth2Login((oauth2) -> oauth2
				.userInfoEndpoint(
						(userInfoEndpointConfig) -> userInfoEndpointConfig.userService(oauth2UserDetailsService))
				.successHandler(oauth2LoginSuccessHandler)
				.failureHandler(oauth2LoginFailureHandler));
		
		http.addFilterBefore(new JWTFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
		http.addFilterBefore(new LogoutFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
		http.addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil), UsernamePasswordAuthenticationFilter.class);

		http.authenticationProvider(customAuthenticationProvider());
		http.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}
}
