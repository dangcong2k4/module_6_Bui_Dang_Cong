package com.example.food_store_cbd_be.service.impl;

import com.example.food_store_cbd_be.dto.request.UpdateUserForm;
import com.example.food_store_cbd_be.model.user.Role;
import com.example.food_store_cbd_be.model.user.User;
import com.example.food_store_cbd_be.repository.IUserRepository;
import com.example.food_store_cbd_be.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository iUserRepository;

    @Override
    public User findById(int id) {
        return iUserRepository.findById(id).orElse(null);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return iUserRepository.findByUsername(username);
    }


    @Override
    public void updateUser(UpdateUserForm updateUserForm) {
        iUserRepository.updateUser(updateUserForm.getName(),
                updateUserForm.getPhoneNumber(),
                updateUserForm.getEmail(),
                updateUserForm.getAddress(),
                updateUserForm.getAge(),
                updateUserForm.getGender(),
                updateUserForm.getDateOfBirth(),
                updateUserForm.getAvatar(),
                updateUserForm.getUsername());
    }

    @Override
    public void changePassword(String password, String username) {
        iUserRepository.changePassword(password,username);
    }


    @Override
    public void save(User user) {
       iUserRepository.save(user);
    }


    @Override
    public Boolean existsByUsername(String username) {

         return    iUserRepository.existsByUsername(username);

    }


    @Override
    public Boolean existsByEmail(String email) {
        return iUserRepository.existsByEmail(email);
    }

    @Override
    public Boolean existsByPhoneNumber(String number) {
        return iUserRepository.existsByPhoneNumber(number);
    }


    @Override
    public List<User> findAll() {
        return iUserRepository.getAllUser();
    }

    @Override
    public void updateAvatar(Integer id, String image) {
        iUserRepository.updateAvatar(id,image);
    }


}


