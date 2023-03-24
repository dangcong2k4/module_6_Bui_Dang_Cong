package com.example.food_store_cbd_be.service.impl;

import com.example.food_store_cbd_be.model.bill.PaymentMethod;
import com.example.food_store_cbd_be.repository.IPaymentMethodRepository;
import com.example.food_store_cbd_be.service.IPaymentMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentMethodService implements IPaymentMethod {
    @Autowired
    private IPaymentMethodRepository paymentMethodRepository;
    @Override
    public PaymentMethod findById(int id) {
        return paymentMethodRepository.findById(id).orElse(null);
    }

    @Override
    public List<PaymentMethod> getAll() {
        return paymentMethodRepository.findAll();
    }
}
