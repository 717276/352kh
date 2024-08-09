package com.kh.daeng.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.kh.daeng.domain.dto.user.Dog;

@Mapper
public interface DogMapper {
    void insertDog(Dog dog);
}