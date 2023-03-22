package com.example.food_store_cbd_be.service.impl;

import com.example.food_store_cbd_be.model.food.Food;
import com.example.food_store_cbd_be.repository.IFoodRepository;
import com.example.food_store_cbd_be.service.IFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class FoodService implements IFoodService {
    @Autowired
    private IFoodRepository foodRepository;


    @Override
    public Page<Food> findAllFood(Pageable pageable) {
        return foodRepository.findAll(pageable);
    }

    @Override
    public Page<Food> showFoodForCustomer(Pageable pageable) {
        return foodRepository.findAll(pageable);
    }

    @Override
    public Food findFood(Integer id) {
        return foodRepository.findFood(id);
    }
}
