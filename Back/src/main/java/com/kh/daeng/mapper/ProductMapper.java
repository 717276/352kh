package com.kh.daeng.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.kh.daeng.domain.dto.shop.Product;

public interface ProductMapper {
	public List<Product> selectProductList() throws Exception;
	
	public Product selectProductDetail(int pdNo) throws Exception;
	
	public void insertProduct(Product product) throws Exception;
	
	public void updateProduct(Product product) throws Exception;

	public void deleteProduct(int pdNo) throws Exception;

	public void insertImg(int no);

	public int getMaxPdNo() throws Exception;
	
	public void deleteImg(int pdNo);

	public void updateImg(@Param("pdNo") int pdNo, @Param("index") int index);
}
