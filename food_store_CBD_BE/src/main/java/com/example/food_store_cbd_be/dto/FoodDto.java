package com.example.food_store_cbd_be.dto;

public class FoodDto {
    private int id;
    private String name;
    private String image;
    private Double price;
    private String description;
    private Boolean flagDelete=false;

    public FoodDto() {
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getFlagDelete() {
        return flagDelete;
    }

    public void setFlagDelete(Boolean flagDelete) {
        this.flagDelete = flagDelete;
    }
}
