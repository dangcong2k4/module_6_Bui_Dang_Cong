package com.example.food_store_cbd_be.controller;

import com.example.food_store_cbd_be.dto.FoodDto;
import com.example.food_store_cbd_be.dto.FoodDtoSearch;
import com.example.food_store_cbd_be.dto.IFoodDto;
import com.example.food_store_cbd_be.model.food.Food;
import com.example.food_store_cbd_be.service.IFoodService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/food")
public class FoodController {
    @Autowired
    private IFoodService foodService;

    @GetMapping("/list")
    public ResponseEntity<Page<Food>> findAll(
            @PageableDefault(value = 5) Pageable pageable) {
        Page<Food> foods = foodService.findAllFood(pageable);
        if (foods.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }


    @GetMapping("/TrashCan")
    public ResponseEntity<Page<IFoodDto>> showFoodTrashCan(
            @PageableDefault(value = 5) Pageable pageable) {
        Page<IFoodDto> foods = foodService.showFoodTrashCan(pageable);
        if (foods.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/show")
    public ResponseEntity<Page<Food>> showList(
            @PageableDefault(value = 16) Pageable pageable) {
        Page<Food> commodityList = foodService.showFoodForCustomer(pageable);
        if (commodityList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(commodityList, HttpStatus.OK);
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<Food> findById(@PathVariable("id") Integer id) {
        Food food = foodService.findFood(id);
        if (food == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(food, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Food> deleteFood(@PathVariable("id") Integer id) {
        Food food = foodService.findFood(id);
        if (food == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        foodService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/restore/{id}")
    public ResponseEntity<Food> restoreFood(@PathVariable("id") Integer id) {
        Food food = foodService.findTrashCanFood(id);
        if (food == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        foodService.restore(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/create")
    public ResponseEntity<?> createFood(@RequestBody  Food food, BindingResult bindingResult) {
        foodService.addFood(food);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editFood(@RequestBody @Validated FoodDto foodDto, BindingResult bindingResult, @PathVariable("id") Integer id) {
        Food food = foodService.findFood(id);
        BeanUtils.copyProperties(foodDto, food);
        foodService.editFood(food);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/search")
    public ResponseEntity<Page<IFoodDto>> findByAllSearch(
            @RequestBody FoodDtoSearch foodDtoSearch ,
            @PageableDefault(value = 5) Pageable pageable){
        Page<IFoodDto> foodDtos = foodService.findByAllSearch(foodDtoSearch,pageable);
        if (foodDtos.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(foodDtos,HttpStatus.OK);
    }
    @PostMapping("/showList")
    public ResponseEntity<Page<IFoodDto>> findByAllSearchForCustomer(
            @RequestBody FoodDtoSearch foodDtoSearch ,
            @PageableDefault(value = 16) Pageable pageable){
        Page<IFoodDto> foodDtos = foodService.findByAllSearch(foodDtoSearch,pageable);
        if (foodDtos.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(foodDtos,HttpStatus.OK);
    }

}
