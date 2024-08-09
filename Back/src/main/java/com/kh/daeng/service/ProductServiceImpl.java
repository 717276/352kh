package com.kh.daeng.service;

import java.io.File;
import java.io.FilenameFilter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kh.daeng.domain.dto.shop.Product;
import com.kh.daeng.mapper.ProductMapper;
import com.kh.daeng.service.iface.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductMapper mapper;

	@Override
	public List<Product> selectProductList() throws Exception {
		return mapper.selectProductList();
	}
	
	@Override
	public Product selectProductDetail(int pdNo) throws Exception {
		Product product = mapper.selectProductDetail(pdNo);
		return product;
	}

	@Override
	public void insertProduct(Product product, int no) throws Exception {
	    mapper.insertProduct(product);
	    for(int i=0; i < no; i++) {
	    	mapper.insertImg(i);
	    }
	    
	}

	@Override
	public void updateProduct(Product product, MultipartFile image, MultipartFile[] detailImages) throws Exception {
				
		// 상품 업데이트
		mapper.updateProduct(product);
		
		// 새 파일 저장
        int index = 1;
        if (image != null && !image.isEmpty()) {
        	// 기존 이미지 파일 삭제
            deleteFilesByPdNo(product.getPd_no());
    		mapper.deleteImg(product.getPd_no());
            String filename = "product_" + product.getPd_no() + "_1.jpg";
            String path = "C:/DaengTrip/public/images/shop/";
            File directory = new File(path);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            File targetFile = new File(directory, filename);
            image.transferTo(targetFile);
            index++;
        }

        if (detailImages != null && detailImages.length > 0) {
            String path = "C:/DaengTrip/public/images/shop/";
            File directory = new File(path);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            for (MultipartFile file : detailImages) {
                if (file != null && !file.isEmpty()) {
                    String filename = "product_" + product.getPd_no() + "_" + index + ".jpg";
                    File targetFile = new File(directory, filename);
                    file.transferTo(targetFile);
                    index++;
                }
            }
        }
        
        // 새로운 이미지 정보 DB에 추가
        for (int i = 1; i < index; i++) {
            mapper.updateImg(product.getPd_no(), i);
        }
	}
	
	private void deleteFilesByPdNo(int pdNo) {
        String path = "C:/DaengTrip/public/images/shop/";
        File directory = new File(path);

        if (directory.exists() && directory.isDirectory()) {
            FilenameFilter filter = (dir, name) -> name.contains("product_" + pdNo);
            File[] files = directory.listFiles(filter);

            if (files != null) {
                for (File file : files) {
                    if (file.exists()) {
                        file.delete();
                    }
                }
            }
        }
    }

	@Override
	public void deleteProduct(int pdNo) throws Exception {
		mapper.deleteProduct(pdNo);
	}

	@Override
	public int getMaxPdNo() throws Exception {
		int pdNo = mapper.getMaxPdNo();
		return pdNo;
	}
	
}
