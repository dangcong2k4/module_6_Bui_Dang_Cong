package com.example.food_store_cbd_be.service;

import com.example.food_store_cbd_be.model.bill.Bill;
import com.example.food_store_cbd_be.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;


public interface IBillService {

    void addBill(Bill bill);
    Integer showRankUser(Integer id);
    Page<Bill> findAllByUser(User user, Pageable pageable);
    Page<Bill> findAllBill(Pageable pageable);
}
