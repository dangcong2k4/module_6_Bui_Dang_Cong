package com.example.food_store_cbd_be.service.impl;

import com.example.food_store_cbd_be.model.cart.Cart;
import com.example.food_store_cbd_be.model.food.Food;
import com.example.food_store_cbd_be.model.user.User;
import com.example.food_store_cbd_be.repository.ICartRepository;
import com.example.food_store_cbd_be.repository.IFoodRepository;
import com.example.food_store_cbd_be.service.ICartService;
import com.example.food_store_cbd_be.service.IFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService implements ICartService {
    @Autowired
    private ICartRepository cartRepository;

    @Autowired
    private IFoodRepository foodRepository;
    @Override
    public Boolean addCart(Food food,Integer userId) {
       return cartRepository.existsByFoodIdAndUserId(food,userId);
    }

    @Override
    public void createCart(Cart cart) {
        cartRepository.save(cart);
    }

    @Override
    public Food findFoodById(Integer id) {
        return foodRepository.findById(id).orElse(null);
    }

    @Override
    public List<Cart> findAllByUser(User user) {
        return cartRepository.findAllByUser(user);
    }

    @Override
    public List<Cart> findAll(Integer id) {
        return cartRepository.findAllCart(id);
    }

    @Override
    public Cart findByFoodIdAndUserId(Food foodId, Integer user_id) {
        return cartRepository.findByFoodIdAndUserId(foodId, user_id);
    }

//    @Override
//    public List<Cart> findAllByUser(User user) {
//        return findAllByUser(user);
//    }


    @Override
    public void deleteCart(Integer id) {
        cartRepository.deleteById(id);
    }

    @Override
    public Cart findCart(Integer id) {
        return cartRepository.findById(id).orElse(null);
    }
}
