package com.example.food_store_cbd_be.repository;

import com.example.food_store_cbd_be.model.bill.BillHistory;
import com.example.food_store_cbd_be.model.bill.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPaymentMethodRepository extends JpaRepository<PaymentMethod,Integer>{
}
