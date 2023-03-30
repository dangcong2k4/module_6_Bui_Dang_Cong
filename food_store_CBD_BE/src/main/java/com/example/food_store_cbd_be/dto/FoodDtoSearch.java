package com.example.food_store_cbd_be.dto;

public class FoodDtoSearch {
    String priceMin;
    String PriceMax;
    String name;

    public String getPriceMin() {
        return priceMin;
    }

    public void setPriceMin(String priceMin) {
        this.priceMin = priceMin;
    }

    public String getPriceMax() {
        return PriceMax;
    }

    public void setPriceMax(String priceMax) {
        PriceMax = priceMax;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
