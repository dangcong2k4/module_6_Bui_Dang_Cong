package com.example.food_store_cbd_be.controller;

import com.example.food_store_cbd_be.model.bill.Bill;
import com.example.food_store_cbd_be.model.bill.BillDTO;
import com.example.food_store_cbd_be.model.bill.PaymentMethod;
import com.example.food_store_cbd_be.model.user.User;
import com.example.food_store_cbd_be.service.IBillService;
import com.example.food_store_cbd_be.service.IPaymentMethod;
import com.example.food_store_cbd_be.service.IUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/bill")
public class BillController {
    @Autowired
    private IBillService billService;
    @Autowired
    private IPaymentMethod paymentMethod1;
    @Autowired
    private IUserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createCommodity(@RequestBody BillDTO billDTO, BindingResult bindingResult) {
        System.out.println(billDTO);
        Bill bill = new Bill();
        User user = userService.findById(billDTO.getUser());
        PaymentMethod paymentMethod = paymentMethod1.findById(billDTO.getPaymentMethod());
        BeanUtils.copyProperties(billDTO, bill);
        bill.setUser(user);
        bill.setPaymentMethod(paymentMethod);
        billService.addBill(bill);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/paymentMethod")
    public ResponseEntity<List<PaymentMethod>> getAllTrademark() {
        List<PaymentMethod> paymentMethods = paymentMethod1.getAll();
        if (paymentMethods.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(paymentMethods, HttpStatus.OK);
    }
}
