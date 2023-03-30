package com.example.food_store_cbd_be.service.impl;

import com.example.food_store_cbd_be.dto.FoodDtoSearch;
import com.example.food_store_cbd_be.dto.IFoodDto;
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
        return foodRepository.findAllFood(pageable);
    }


    @Override
    public Page<Food> showFoodForCustomer(Pageable pageable) {
        return foodRepository.findAllFood(pageable);
    }

    @Override
    public Page<IFoodDto> showFoodTrashCan(Pageable pageable) {
        return foodRepository.showFoodTrashCan(pageable);
    }

    @Override
    public void delete(Integer id) {
        foodRepository.deleteFood(id);
    }

    @Override
    public void restore(Integer id) {
        foodRepository.restoreFood(id);
    }

    @Override
    public Food findFood(Integer id) {
        return foodRepository.findFood(id);
    }

    @Override
    public Food findTrashCanFood(Integer id) {
        return foodRepository.findTrashCanFood(id);
    }

    @Override
    public void addFood(Food food) {
        foodRepository.save(food);
    }

    @Override
    public void editFood(Food food) {
        foodRepository.save(food);
    }

    @Override
    public Page<IFoodDto> findByAllSearch(FoodDtoSearch foodDtoSearch, Pageable pageable) {
        return foodRepository.findByAllSearch(foodDtoSearch,pageable);
    }

}
