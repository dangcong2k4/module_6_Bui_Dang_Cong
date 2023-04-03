package com.example.food_store_cbd_be.controller;

import com.example.food_store_cbd_be.dto.CartDto;
import com.example.food_store_cbd_be.model.cart.Cart;
import com.example.food_store_cbd_be.model.food.Food;
import com.example.food_store_cbd_be.model.user.User;
import com.example.food_store_cbd_be.service.ICartService;
import com.example.food_store_cbd_be.service.IFoodService;
import com.example.food_store_cbd_be.service.IUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private ICartService cartService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IFoodService foodService;

    @GetMapping("/list/{id}")
    public ResponseEntity<List<Cart>> showList(@PathVariable("id") Integer id){
        List<Cart> carts = cartService.findAll(id);
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }
    @PostMapping("/increase")
    public ResponseEntity<?> increaseQuantity(@RequestBody CartDto cartDto) {
        System.out.println(cartDto.getFoodId());
        System.out.println(cartDto.getUserId());
        System.out.println(cartDto.getSize());
        Cart cart = new Cart();
        User user = userService.findById(cartDto.getUserId());
        Food food = foodService.findFood(cartDto.getFoodId());
        BeanUtils.copyProperties(cartDto, cart);
        cart.setUser(user);
        cart.setFoodId(food);
        Cart cart1 = cartService.findByFoodIdAndUserId(cart.getFoodId(),cart.getUser().getId(),cart.getSize());
        cart1.setQuantity(cart1.getQuantity() + 1);
        cartService.createCart(cart1);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/reduce")
    public ResponseEntity<?> reduceQuantity(@RequestBody CartDto cartDto) {
        Cart cart = new Cart();
        User user = userService.findById(cartDto.getUserId());
        Food food = foodService.findFood(cartDto.getFoodId());
        BeanUtils.copyProperties(cartDto, cart);
        cart.setUser(user);
        cart.setFoodId(food);
        Cart cart1 = cartService.findByFoodIdAndUserId(cart.getFoodId(),cart.getUser().getId(),cart.getSize());
        cart1.setQuantity(cart1.getQuantity() - 1);
        cartService.createCart(cart1);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/edit")
    public ResponseEntity<?> editSize(@RequestBody CartDto cartDto) {
        Cart cart = new Cart();
        List<Cart> carts = cartService.findAll(cartDto.getUserId());
        for (int i = 0; i < carts.size(); i++) {
            if (carts.get(i).getSize().equals(cartDto.getSize())  && carts.get(i).getFoodId().getId()==cartDto.getFoodId() && carts.get(i).getUser().getId()==cartDto.getUserId()) {

                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        BeanUtils.copyProperties(cartDto, cart);
        cartService.updateSize(cart.getId(),cart.getSize());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrUpdate(@RequestBody CartDto cartDto) {
        System.out.println(cartDto);
        Cart cart = new Cart();
        User user = userService.findById(cartDto.getUserId());
        Food food = foodService.findFood(cartDto.getFoodId());
        BeanUtils.copyProperties(cartDto, cart);
        cart.setUser(user);
        cart.setFoodId(food);
        if (cartService.addCart(cart.getFoodId(),cart.getUser().getId(),cart.getSize())) {
            Cart cart1 = cartService.findByFoodIdAndUserId(cart.getFoodId(),cart.getUser().getId(),cart.getSize());
            cart1.setQuantity(cart1.getQuantity() + 1);
            cart1.setSize(cart1.getSize());
            cartService.createCart(cart1);
        }else {
            Cart cart1 = new Cart();
            cart1.setQuantity(cartDto.getQuantity());
            cart1.setSize(cartDto.getSize());
            cart1.setFoodId(foodService.findFood(cartDto.getFoodId()));
            cart1.setUser(userService.findById(cartDto.getUserId()));
            cartService.createCart(cart1);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Cart> deleteCart(@PathVariable("id") Integer id) {
        Cart cart = cartService.findCart(id);
        if (cart == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        cartService.deleteCart(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
