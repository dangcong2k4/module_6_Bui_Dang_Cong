package com.example.food_store_cbd_be.service;

import com.example.food_store_cbd_be.model.bill.Bill;
import com.example.food_store_cbd_be.model.bill.BillHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IBillHistoryService {

    void addBillHistory(BillHistory billHistory);

    Page<BillHistory> findAllByBill(Bill bill, Pageable pageable);


    Page<BillHistory> findFoodByQuantity(Pageable pageable);
}
