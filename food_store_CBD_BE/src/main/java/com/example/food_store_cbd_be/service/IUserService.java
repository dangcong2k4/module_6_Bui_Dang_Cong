package com.example.food_store_cbd_be.service;

import com.example.food_store_cbd_be.dto.request.UpdateUserForm;
import com.example.food_store_cbd_be.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    User findById(int id);

    Optional<User> findByUsername(String username);

    void updateUser(UpdateUserForm updateUserForm);

    void changePassword(String password,String username);

    void save(User user);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
    Boolean existsByPhoneNumber(String number);


    List<User> findAll();

    void updateAvatar(Integer id,String image);



}
