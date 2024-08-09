package com.kh.daeng.config.web.auth;

import java.util.Collection;
import java.util.List;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.Authentication;

public class AccessManager implements AccessDecisionManager {

	private final List<AccessDecisionVoter<?>> decisionVoters;

	public AccessManager(List<AccessDecisionVoter<?>> decisionVoters) {
        this.decisionVoters = decisionVoters;
    }

	@Override
	public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> configAttributes)
			throws AccessDeniedException {
		int grant = 0;

		for (AccessDecisionVoter voter : decisionVoters) {
			int result = voter.vote(authentication, object, configAttributes);
			switch (result) {
			case AccessDecisionVoter.ACCESS_GRANTED:
				grant++;
				break;
			case AccessDecisionVoter.ACCESS_DENIED:
				throw new AccessDeniedException("Access is denied");
			default:
				break;
			}
		}

		if (grant > 0) {
			return;
		}

		throw new AccessDeniedException("Access is denied");
	}

	@Override
	public boolean supports(ConfigAttribute attribute) {
		return true;
	}

	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}

}
