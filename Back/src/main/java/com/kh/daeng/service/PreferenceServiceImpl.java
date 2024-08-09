package com.kh.daeng.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.daeng.domain.dto.user.Preference;
import com.kh.daeng.mapper.PreferenceMapper;
import com.kh.daeng.service.iface.PreferenceService;

@Service
public class PreferenceServiceImpl implements PreferenceService {

    @Autowired
    private PreferenceMapper preferenceMapper;

    @Override
    public List<Preference> getAllprePreferences() {
        return preferenceMapper.selectAllPreferences();
    }
    @Override
    public void registerPreference(Preference preference) {
        preferenceMapper.insertPreference(preference);
    }
}
