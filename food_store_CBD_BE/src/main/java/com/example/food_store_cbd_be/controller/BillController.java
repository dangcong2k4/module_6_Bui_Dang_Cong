package com.example.food_store_cbd_be.controller;

import com.example.food_store_cbd_be.dto.CartDto;
import com.example.food_store_cbd_be.model.bill.Bill;
import com.example.food_store_cbd_be.dto.BillDTO;
import com.example.food_store_cbd_be.model.bill.BillHistory;
import com.example.food_store_cbd_be.model.cart.Cart;
import com.example.food_store_cbd_be.model.food.Food;
import com.example.food_store_cbd_be.model.user.User;
import com.example.food_store_cbd_be.service.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/bill")
public class BillController {
    @Autowired
    private IBillService billService;
    @Autowired
    private IUserService userService;

    @Autowired
    private ICartService cartService;

    @Autowired
    private IBillHistoryService billHistoryService;


    @PostMapping("/buy")
    public ResponseEntity<?> buy(@RequestBody BillDTO billDTO) {
        List<Cart> list = cartService.findAllByUser(userService.findById(billDTO.getUserId()));
        Bill bill = new Bill();
        bill.setBuyDate(billDTO.getTime());
        bill.setTotal(billDTO.getTotal());
        bill.setUser(userService.findById(billDTO.getUserId()));
        billService.addBill(bill);
        for (int i = 0; i < list.size(); i++) {
            BillHistory billHistory = new BillHistory();
            billHistory.setBill(bill);
            billHistory.setQuantity(list.get(i).getQuantity());
            billHistory.setFood(list.get(i).getFoodId());
            billHistory.setSize(list.get(i).getSize());
            billHistoryService.addBillHistory(billHistory);
        }
        cartService.deleteCartByIdUser(billDTO.getUserId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<Page<Bill>> findAll(@PathVariable("id") User user,
            @PageableDefault(value = 5) Pageable pageable) {
        Page<Bill> bills = billService.findAllByUser(user,pageable);
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }
    @GetMapping("/list")
    public ResponseEntity<Page<Bill>> findAllForAdmin(@PageableDefault(value = 5) Pageable pageable) {
        Page<Bill> bills = billService.findAllBill(pageable);
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }



    @GetMapping("/ranks/{id}")
    public ResponseEntity<Integer> findAll(@PathVariable("id") Integer ide) {
        return new ResponseEntity<>(billService.showRankUser(ide), HttpStatus.OK);
    }
}
