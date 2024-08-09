package com.kh.daeng;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
@MapperScan(basePackages="com.kh.daeng.mapper")
public class DaengApplication {

	public static void main(String[] args) {
		SpringApplication.run(DaengApplication.class, args);
	}

}
