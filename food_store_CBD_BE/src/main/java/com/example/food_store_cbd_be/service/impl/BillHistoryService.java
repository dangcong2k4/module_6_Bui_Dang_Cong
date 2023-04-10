package com.example.food_store_cbd_be.service.impl;

import com.example.food_store_cbd_be.model.bill.Bill;
import com.example.food_store_cbd_be.model.bill.BillHistory;
import com.example.food_store_cbd_be.repository.IBillHistoryRepository;
import com.example.food_store_cbd_be.repository.IBillRepository;
import com.example.food_store_cbd_be.service.IBillHistoryService;
import com.example.food_store_cbd_be.service.IBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BillHistoryService implements IBillHistoryService {
    @Autowired
    private IBillHistoryRepository billHistoryRepository;

    @Override
    public void addBillHistory(BillHistory billHistory) {
        billHistoryRepository.save(billHistory);
    }

    @Override
    public Page<BillHistory> findAllByBill(Bill bill, Pageable pageable) {
        return billHistoryRepository.findAllByBill(bill, pageable);
    }

    @Override
    public Page<BillHistory> findFoodByQuantity(Pageable pageable) {
        return billHistoryRepository.findFoodByQuantity(pageable);
    }
}
