package com.example.food_store_cbd_be.repository;

import com.example.food_store_cbd_be.model.bill.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBillRepository extends JpaRepository<Bill,Integer> {
}
