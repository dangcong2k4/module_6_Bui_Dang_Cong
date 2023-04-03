package com.example.food_store_cbd_be.model.bill;

import com.example.food_store_cbd_be.model.food.Food;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class BillHistory implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    private Bill bill;

    @ManyToOne
    private Food food;
    private Integer quantity;
    private String size;

    public Bill getBill() {
        return bill;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }
}
