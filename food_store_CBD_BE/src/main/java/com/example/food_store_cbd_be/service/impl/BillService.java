package com.example.food_store_cbd_be.service.impl;

import com.example.food_store_cbd_be.model.bill.Bill;
import com.example.food_store_cbd_be.model.user.User;
import com.example.food_store_cbd_be.repository.IBillRepository;
import com.example.food_store_cbd_be.service.IBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BillService implements IBillService {

    @Autowired
    private IBillRepository billRepository;

    @Override
    public void addBill(Bill bill) {
        billRepository.save(bill);
    }

    @Override
    public Integer showRankUser(Integer id) {
        return billRepository.showRankUser(id);
    }

    @Override
    public Page<Bill> findAllByUser(User user, Pageable pageable) {
        return billRepository.findAllByUserOrderByIdDesc(user, pageable);
    }

    @Override
    public Page<Bill> findAllBill(Pageable pageable) {
        return billRepository.findAllBill(pageable);
    }
}
