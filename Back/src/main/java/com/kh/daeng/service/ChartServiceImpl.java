package com.kh.daeng.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.daeng.mapper.ChartMapper;
import com.kh.daeng.service.iface.ChartService;

@Service
public class ChartServiceImpl implements ChartService {

	@Autowired
	private ChartMapper mapper;

	@Override
	public List<Map<String, Object>> getChart1() throws Exception {
		return mapper.getChart1();
	}

}
