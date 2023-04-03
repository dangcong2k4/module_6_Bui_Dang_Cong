package com.example.food_store_cbd_be.repository;

import com.example.food_store_cbd_be.model.bill.Bill;
import com.example.food_store_cbd_be.model.bill.BillHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBillHistoryRepository extends JpaRepository<BillHistory, Integer> {
    Page<BillHistory> findAllByBill(Bill bill, Pageable pageable);
}
