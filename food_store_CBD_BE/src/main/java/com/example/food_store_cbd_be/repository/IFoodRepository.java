package com.example.food_store_cbd_be.repository;

import com.example.food_store_cbd_be.model.food.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFoodRepository extends JpaRepository<Food, Integer > {

}
