package com.example.food_store_cbd_be.repository;

import com.example.food_store_cbd_be.dto.CartDtos;
import com.example.food_store_cbd_be.model.cart.Cart;
import com.example.food_store_cbd_be.model.food.Food;
import com.example.food_store_cbd_be.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICartRepository extends JpaRepository<Cart,Integer> {

    @Query(value = "select * from cart " +
            "where user_id =:id ",
            nativeQuery = true)
    List<Cart> findAllCart(@Param("id") Integer id);

    List<Cart> findAllByUser(User user);
   Boolean existsByFoodIdAndUserId(Food foodId, Integer user_id);
   Cart findByFoodIdAndUserId(Food foodId, Integer user_id);
}
