import { Component, OnInit } from '@angular/core';
import {Cart} from "../../model/cart";
import {TokenService} from "../../service/JWT/token.service";
import {FormControl, FormGroup} from "@angular/forms";
import {BillService} from "../../service/bill.service";
import Swal from "sweetalert2";
import {User} from "../../model/user";
import {PaymentMethod} from "../../model/payment-method";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  billForm: FormGroup;
  cart:Cart[] = []
  payment: PaymentMethod[] = [];
  user:User
  quantity = 0;
  total = 0;
  constructor(private token:TokenService, private billService:BillService) {
    this.billForm = new FormGroup({
      buyDate: new FormControl(''),
      detail: new FormControl(''),
      paymentMethod: new FormControl(''),
      user: new FormControl(''),
    });
    this.billService.getAllPaymentMethod().subscribe(next=>{
      this.payment=next
    })
  }
  addBill(){
    if(this.billForm.valid){
        this.billService.addBill(this.billForm.value).subscribe(next=>{
          Swal.fire({
            position: 'center',
            title: 'Thêm mới thành công',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Thêm mới thất bại!',
            text: 'Thêm mới thất bại',
            showConfirmButton: false,
            timer: 2000
          });
        })
    }else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Thêm mới thất bại!',
        text: 'Thêm mới thất bại vui lòng điền đúng tất cả thông tin',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  ngOnInit(): void {
    this.loader()
    console.log(this.cart)

  }
  loader() {

    this.cart = this.token.getCart()
    this.getValue()
  }
  getValue() {
    this.total = 0
    this.quantity = this.cart.length;
    for (let i = 0; i < this.cart.length; i++) {
      this.total += this.cart[i].price * this.cart[i].quantity
    }
  }
  stepUp(index:number) {

    this.token.stepUp(index);
    this.loader();
    this.getValue();
  }
  stepDown(index:number) {
    this.token.stepDown(index);
    this.loader();
    this.getValue()
  }
}
