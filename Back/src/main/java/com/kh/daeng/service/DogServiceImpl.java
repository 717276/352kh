package com.kh.daeng.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.daeng.domain.dto.user.Dog;
import com.kh.daeng.mapper.DogMapper;
import com.kh.daeng.service.iface.DogService;



@Service
public class DogServiceImpl implements DogService {

    @Autowired
    private DogMapper dogMapper;

    @Override
    public void registerDog(Dog dog) {
        dogMapper.insertDog(dog);
    }
}