package com.example.food_store_cbd_be.model.bill;

import com.example.food_store_cbd_be.model.food.Food;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Entity
public class BillHistory implements Serializable {
    @Id
    @ManyToOne
    private Bill bill;
    @Id
    @ManyToOne
    private Food food;
    private Integer quantity;

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public Food getFood() {
        return food;
    }

    public void setFood(Food food) {
        this.food = food;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
