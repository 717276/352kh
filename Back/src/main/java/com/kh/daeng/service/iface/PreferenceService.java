package com.kh.daeng.service.iface;

import java.util.List;

import com.kh.daeng.domain.dto.user.Preference;



public interface PreferenceService {
	List<Preference> getAllprePreferences();
    void registerPreference(Preference preference);

}
