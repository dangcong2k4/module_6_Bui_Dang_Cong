package com.example.food_store_cbd_be.repository;

import com.example.food_store_cbd_be.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Transactional
@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {


    @Query(value = "select * from user where username = :username", nativeQuery = true)
    Optional<User> findByUsername(@Param("username") String username);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByPhoneNumber(String phoneNumber);
    @Modifying
    @Query(value = "update user set name = :name,phone_number = :phone_number,email = :email," +
            " address = :address,age = :age,gender = :gender,date_of_birth = :date_of_birth,avatar = :avatar" +
            " where username = :username  ", nativeQuery = true)
    void updateUser(@Param("name") String name, @Param("phone_number") String phoneNumber, @Param("email") String email
            , @Param("address") String address, @Param("age") Integer age, @Param("gender") Boolean gender
            , @Param("date_of_birth") String dateOfBirth, @Param("avatar") String avatar, @Param("username") String username);


    @Modifying
@Query(value = "update user set password = :password where username = :username",nativeQuery = true)
    void changePassword(@Param("password") String password,@Param("username") String username);


    @Query(value = "select * from user", nativeQuery = true)
    List<User> getAllUser();

    @Modifying
    @Transactional
    @Query(value = "update user  set avatar = :avatar" +
            " where id = :id", nativeQuery = true)
    void updateAvatar(@Param("id") Integer id,
                      @Param("avatar") String avatar);

}

