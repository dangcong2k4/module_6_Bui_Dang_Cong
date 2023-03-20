package com.example.food_store_cbd_be.controller;

import com.example.food_store_cbd_be.model.food.Food;
import com.example.food_store_cbd_be.service.IFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("")
public class FoodController {
    @Autowired
    private IFoodService foodService;

    @GetMapping("/list")
    public ResponseEntity<Page<Food>> showList(
            @PageableDefault(value = 1) Pageable pageable) {
        Page<Food> commodityList = foodService.findAllFood(pageable);
        if (commodityList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(commodityList, HttpStatus.OK);
    }
}
