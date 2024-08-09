package com.kh.daeng.config.web.auth;

import java.util.Collection;

import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.Authentication;

public class Voter implements AccessDecisionVoter<Object> {

	@Override
	public boolean supports(ConfigAttribute attribute) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
    public int vote(Authentication authentication, Object object, Collection<ConfigAttribute> attributes) {
        if (authentication == null) {
            throw new AccessDeniedException("Access is denied");
        }
        for (ConfigAttribute attribute : attributes) {
            if (this.supports(attribute)) {
                String requiredRole = attribute.getAttribute();
                if (requiredRole != null && authentication.getAuthorities()
                		.stream()
                        .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(requiredRole))) {
                    return ACCESS_GRANTED;
                }
            }
        }
        throw new AccessDeniedException("Access is denied");
    }

}
