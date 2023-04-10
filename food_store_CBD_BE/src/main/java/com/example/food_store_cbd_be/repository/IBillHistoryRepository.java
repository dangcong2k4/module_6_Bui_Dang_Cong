package com.example.food_store_cbd_be.repository;

import com.example.food_store_cbd_be.model.bill.Bill;
import com.example.food_store_cbd_be.model.bill.BillHistory;
import com.example.food_store_cbd_be.model.food.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IBillHistoryRepository extends JpaRepository<BillHistory, Integer> {
    Page<BillHistory> findAllByBill(Bill bill, Pageable pageable);

    @Query(value = "select * from bill_history " +
            " group by food_id " +
            " order by sum(quantity)  desc",
            nativeQuery = true)
    Page<BillHistory> findFoodByQuantity(Pageable pageable);
}
