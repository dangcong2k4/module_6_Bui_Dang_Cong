package com.example.food_store_cbd_be.repository;

import com.example.food_store_cbd_be.model.food.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IFoodRepository extends JpaRepository<Food, Integer > {
    @Query(value = "select * from food " +
            "where id =:id " +
            "and flag_delete = true ",
            nativeQuery = true)
    Food findFood(@Param("id") Integer id);
}
