package com.example.food_store_cbd_be.repository;

import com.example.food_store_cbd_be.model.food.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface IFoodRepository extends JpaRepository<Food, Integer > {
//    lấy đối tượng theo id
    @Query(value = "select * from food " +
            "where id =:id " +
            "and flag_delete = false ",
            nativeQuery = true)
    Food findFood(@Param("id") Integer id);
//lấy đối tượng trong thùng rác theo id
    @Query(value = "select * from food " +
            "where id =:id " +
            "and flag_delete = true ",
            nativeQuery = true)
    Food findTrashCanFood(@Param("id") Integer id);


// hiện thị danh sách món ăn của cửa hàng
    @Query(value = "select * from food " +
            "where flag_delete = false order by id desc ",
            nativeQuery = true)
    Page<Food> findAllFood(Pageable pageable);
//tìm kiếm theo tên
    @Query(value = "select * from food " +
            "where commodity.name like concat('%', :name, '%') and flag_delete = false  order by id desc ",
            nativeQuery = true)
    Page<Food> searchNameFood(Pageable pageable, @Param("name") String name);
    @Query(value = "select * from food " +
            "where food.price <= :price and flag_delete = false  order by price desc ",
            nativeQuery = true)
    Page<Food> searchPriceFood(Pageable pageable, @Param("price") int price);


//    hiện thị danh sách món ăn trong thùng rác
    @Query(value = "select * from food " +
            "where flag_delete = true ",
            nativeQuery = true)
    Page<Food> showFoodTrashCan(Pageable pageable);

// xóa món ăn
    @Modifying
    @Transactional
    @Query(value = "update food  set flag_delete = true" +
            " where id = :id", nativeQuery = true)
    void deleteFood(@Param("id") Integer id);

//    khôi phục món ăn
    @Modifying
    @Transactional
    @Query(value = "update food  set flag_delete = false" +
            " where id = :id", nativeQuery = true)
    void restoreFood(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "insert into food" +
            "(`name`, " +
            "price," +
            "image, " +
            "description, " +
            "flag_delete) " +
            "values " +
            "(:#{#food.name}, " +
            ":#{#food.price}, " +
            ":#{#food.image}, " +
            ":#{#food.description}, " +
            ":#{#food.flagDelete})",
            nativeQuery = true)
    void addFood(@Param("food") Food food);


}
