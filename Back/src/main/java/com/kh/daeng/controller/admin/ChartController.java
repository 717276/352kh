package com.kh.daeng.controller.admin;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.daeng.service.iface.ChartService;

@RestController
public class ChartController {
	@Autowired
	private ChartService service;

	@RequestMapping("/api/chart/getChart1")
	public List<Map<String, Object>> getChart1() throws Exception {
		return service.getChart1();
	}
}
