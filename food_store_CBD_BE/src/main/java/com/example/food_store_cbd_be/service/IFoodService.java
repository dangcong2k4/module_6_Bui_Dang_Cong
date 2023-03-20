package com.example.food_store_cbd_be.service;

import com.example.food_store_cbd_be.model.food.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IFoodService {
    Page<Food> findAllFood(Pageable pageable);
}
