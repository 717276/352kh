package com.kh.daeng.service.iface;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.daeng.domain.dto.shop.Product;

public interface ProductService {
	public List<Product> selectProductList() throws Exception;
	
	public Product selectProductDetail(int pdNo) throws Exception;
	
	public void insertProduct(Product product, int no) throws Exception;
	
	void updateProduct(Product product, MultipartFile img, MultipartFile[] detailImages) throws Exception;

	public void deleteProduct(int pdNo) throws Exception;

	public int getMaxPdNo() throws Exception;


}
