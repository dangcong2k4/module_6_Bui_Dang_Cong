package com.example.food_store_cbd_be.controller;

import com.example.food_store_cbd_be.dto.BillDTO;
import com.example.food_store_cbd_be.dto.CartDto;
import com.example.food_store_cbd_be.model.bill.Bill;
import com.example.food_store_cbd_be.model.bill.PaymentMethod;
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
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
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
        if (carts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }
    @PostMapping("/increase")
    public ResponseEntity<?> increaseQuantity(@RequestBody CartDto cartDto) {
        Cart cart = new Cart();
        User user = userService.findById(cartDto.getUserId());
        Food food = foodService.findFood(cartDto.getFoodId());
        BeanUtils.copyProperties(cartDto, cart);
        cart.setUser(user);
        cart.setFoodId(food);
        Cart cart1 = cartService.findByFoodIdAndUserId(cart.getFoodId(),cart.getUser().getId());
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
        Cart cart1 = cartService.findByFoodIdAndUserId(cart.getFoodId(),cart.getUser().getId());
        cart1.setQuantity(cart1.getQuantity() - 1);
        cartService.createCart(cart1);
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
        if (cartService.addCart(cart.getFoodId(),cart.getUser().getId())) {
            Cart cart1 = cartService.findByFoodIdAndUserId(cart.getFoodId(),cart.getUser().getId());
            cart1.setQuantity(cart1.getQuantity() + 1);
            cartService.createCart(cart1);
        }else {
            Cart cart1 = new Cart();
            cart1.setQuantity(cartDto.getQuantity());
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
