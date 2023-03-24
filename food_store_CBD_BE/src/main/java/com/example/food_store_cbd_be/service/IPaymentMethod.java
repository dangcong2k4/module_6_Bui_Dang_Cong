package com.example.food_store_cbd_be.service;

import com.example.food_store_cbd_be.model.bill.PaymentMethod;
import com.example.food_store_cbd_be.model.user.User;

import java.util.List;

public interface IPaymentMethod {

    PaymentMethod findById(int id);

    List<PaymentMethod> getAll();
}
