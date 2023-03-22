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
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/food")
public class FoodController {
    @Autowired
    private IFoodService foodService;

    @GetMapping("/list")
    public ResponseEntity<Page<Food>> findAll(
            @PageableDefault(value = 4) Pageable pageable) {
        Page<Food> commodityList = foodService.findAllFood(pageable);
        if (commodityList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(commodityList, HttpStatus.OK);
    }
    @GetMapping("/show")
    public ResponseEntity<Page<Food>> showList(
            @PageableDefault(value = 16) Pageable pageable) {
        Page<Food> commodityList = foodService.findAllFood(pageable);
        if (commodityList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(commodityList, HttpStatus.OK);
    }



    @GetMapping("/{id}")
    public ResponseEntity<Food> findById(@PathVariable("id") Integer id) {
        Food food = foodService.findFood(id);
        if (food == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(food, HttpStatus.OK);
    }
}
