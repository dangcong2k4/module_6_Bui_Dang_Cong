package com.example.food_store_cbd_be.repository;

import com.example.food_store_cbd_be.model.bill.Bill;
import com.example.food_store_cbd_be.model.cart.Cart;
import com.example.food_store_cbd_be.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBillRepository extends JpaRepository<Bill,Integer> {


    Page<Bill> findAllByUserOrderByIdDesc(User user, Pageable pageable);
    @Query(value = "select * from bill order by id desc ",
            nativeQuery = true)
    Page<Bill> findAllBill(Pageable pageable);


    @Query(value = "select count(user_id) as ranks from bill " +
            "where user_id = :id",
            nativeQuery = true)
    Integer showRankUser(@Param("id") Integer id);
}
