package com.example.food_store_cbd_be.service;

import com.example.food_store_cbd_be.model.user.Role;

import java.util.Optional;

public interface IRoleService {

    Optional<Role> roleAdmin();

    Optional<Role> roleCustomer();

    Optional<Role> roleEmployee();
}
