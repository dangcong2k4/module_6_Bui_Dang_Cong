package com.example.food_store_cbd_be.service;

import com.example.food_store_cbd_be.model.cart.Cart;
import com.example.food_store_cbd_be.model.food.Food;
import com.example.food_store_cbd_be.model.user.User;

import java.util.List;


public interface ICartService {
    Boolean addCart(Food food, Integer userId);

    void createCart(Cart cart);

    Food findFoodById(Integer id);

    List<Cart> findAllByUser(User user);

    List<Cart> findAll(Integer id);

    Cart findByFoodIdAndUserId(Food foodId, Integer user_id);

    void deleteCart(Integer id);

    Cart findCart(Integer id);


}
