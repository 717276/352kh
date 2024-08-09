package com.kh.daeng.mapper;

import com.kh.daeng.domain.dto.web.Refresh;

public interface RefreshMapper {
    Boolean existsByRefresh(String refresh);    
    void deleteByRefresh(String refresh);
    void save(Refresh refresh);
}
