package com.example.food_store_cbd_be.model.bill;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class PaymentMethod {
    @Id
    private int id;
    private String name;

    public PaymentMethod() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
