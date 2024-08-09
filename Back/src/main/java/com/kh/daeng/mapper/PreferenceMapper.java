package com.kh.daeng.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kh.daeng.domain.dto.user.Preference;


@Mapper
public interface PreferenceMapper {
    List<Preference> selectAllPreferences();
    void insertPreference(Preference preference);
}
