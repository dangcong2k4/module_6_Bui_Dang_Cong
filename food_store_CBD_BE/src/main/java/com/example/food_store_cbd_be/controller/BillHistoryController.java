package com.example.food_store_cbd_be.controller;

import com.example.food_store_cbd_be.model.bill.Bill;
import com.example.food_store_cbd_be.model.bill.BillHistory;
import com.example.food_store_cbd_be.model.user.User;
import com.example.food_store_cbd_be.service.IBillHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/billHistory")
public class BillHistoryController {
    @Autowired
    private IBillHistoryService billHistoryService;
    @GetMapping("/list/{id}")
    public ResponseEntity<Page<BillHistory>> findAll(@PathVariable("id") Bill bill,
                                              @PageableDefault(value = 6) Pageable pageable) {
        Page<BillHistory> billHistories = billHistoryService.findAllByBill(bill,pageable);
        return new ResponseEntity<>(billHistories, HttpStatus.OK);
    }

    @GetMapping("/showFood")
    public ResponseEntity<Page<BillHistory>> findAllFoodByQuantity(@PageableDefault(value = 4) Pageable pageable) {
        Page<BillHistory> billHistories = billHistoryService.findFoodByQuantity(pageable);
        return new ResponseEntity<>(billHistories, HttpStatus.OK);
    }


}
