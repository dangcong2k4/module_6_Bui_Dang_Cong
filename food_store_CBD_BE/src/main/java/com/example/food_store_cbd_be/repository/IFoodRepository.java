package com.example.food_store_cbd_be.repository;

import com.example.food_store_cbd_be.dto.FoodDtoSearch;
import com.example.food_store_cbd_be.dto.IFoodDto;
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
public interface IFoodRepository extends JpaRepository<Food, Integer> {
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


    //    hiện thị danh sách món ăn trong thùng rác
    @Query(value = "select f.id ," +
            " f.name as name ," +
            " f.price as price , " +
            "f.description as description ," +
            " f.image as image " +
            "from `food` f \n" +
            "where f.flag_delete = true ",
            nativeQuery = true)
    Page<IFoodDto> showFoodTrashCan(Pageable pageable);





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

    @Query(value = "select f.id ," +
            " f.name as name ," +
            " f.price as price , " +
            "f.description as description ," +
            " f.image as image " +
            "from `food` f \n" +
            "where f.price between :#{#foodDtoSearch.priceMin} and :#{#foodDtoSearch.priceMax}\n" +
            "and f.name like %:#{#foodDtoSearch.name}% \n" +
            "and f.flag_delete = false order by f.id desc", nativeQuery = true)
    Page<IFoodDto> findByAllSearch(@Param("foodDtoSearch") FoodDtoSearch foodDtoSearch, Pageable pageable);


}
