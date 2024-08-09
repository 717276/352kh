package com.kh.daeng.config.web.form;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class FormAuthenticationProvider implements AuthenticationProvider{
	@Autowired
	private FormUserDetailsService formUserDetailsService;
	@Autowired
	private BCryptPasswordEncoder bcryto;	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String email = (String)authentication.getPrincipal();
		String password = (String)authentication.getCredentials();
				
		UserDetails cuds = formUserDetailsService.loadUserByUsername(email);
		if (password.equals(cuds.getPassword())) {			
			return new UsernamePasswordAuthenticationToken(cuds, password, cuds.getAuthorities());
		} else {
			throw new BadCredentialsException("Invalid credentials");
		}
//		if (bcryto.matches(password, cuds.getPassword())) {			
//			return new UsernamePasswordAuthenticationToken(cuds, password, cuds.getAuthorities());
//		} else {
//			throw new BadCredentialsException("Invalid credentials");
//		}
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
	}

}
