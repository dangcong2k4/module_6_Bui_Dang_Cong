import { Component, OnInit } from '@angular/core';
import {Cart} from "../../model/cart";
import {TokenService} from "../../service/JWT/token.service";
import {FormControl, FormGroup} from "@angular/forms";
import {BillService} from "../../service/bill.service";
import Swal from "sweetalert2";
import {User} from "../../model/user";
import {PaymentMethod} from "../../model/payment-method";
import {CartService} from "../../service/cart.service";
import {LoginService} from "../../service/JWT/login.service";
import {ShareService} from "../../service/JWT/share.service";
import {Food} from "../../model/food";

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
  food: Food;
  quantity = 0;
  total = 0;
  isLogged = false;
  constructor(private token:TokenService, private billService:BillService,private cartService:CartService,
              private loginService:LoginService, private shareService:ShareService) {

    this.billForm = new FormGroup({
      buyDate: new FormControl(''),
      detail: new FormControl(''),
      paymentMethod: new FormControl(''),
      user: new FormControl(''),
    });
    this.billService.getAllPaymentMethod().subscribe(next=>{
      this.payment=next
    });
    // this.cartService.showAllCart(3).subscribe(next=>{
    //   this.cart = next;
    //   this.getCart()
    // })

    // this.getCart()
    this.getCart();
    this.shareService.getClickEvent().subscribe(next => {
      this.getCart()
    })
  }



  ngOnInit(): void {
    this.isLogged = this.token.isLogger();
    this.loader();
    this.getCart()
    this.getValue()

    this.shareService.getClickEvent().subscribe(next => {
      this.isLogged = this.token.isLogger();
      this.loader();
      this.getCart()
      this.getValue()
    })
  }

  loader() {
    // this.cart = this.token.getCart()
    // this.getValue()
    if (this.isLogged) {
      this.loginService.profile(this.token.getId()).subscribe( next => {
        this.user = next
      })
    }
  }

  getCart(){
    this.cartService.showAllCart(this.token.getId()).subscribe(next=>{
      this.cart = next;
      this.getValue()
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
  //
  //

  getValue() {
    this.total = 0
    if (this.cart != null) {
      this.quantity = this.cart.length;
      for (let i = 0; i < this.cart.length; i++) {
        this.total += this.cart[i].foodId.price * this.cart[i].quantity
      }
    }

  }
  stepUp(userId:number,foodId:number) {
    this.cartService.increaseQuantity(userId,foodId).subscribe(next=>{
      this.getCart()
      this.getValue();
    })
    this.shareService.sendClickEvent()
    // this.token.stepUp(index);
    // this.loader();

  }
  stepDown(userId:number,foodId:number) {
    this.cartService.reduceQuantity(userId,foodId).subscribe(next=>{
      this.getCart()
      this.getValue()
    })
    // this.token.stepDown(index);
    // this.loader();

  }

  check() {

  }

  delete(id: number,name:string) {
    Swal.fire({
      title: 'Bạn có muốn xóa?',
      text: 'Món ăn: ' + name ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#BBBBBB',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.delete(id).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa thành công ',
            showConfirmButton: false,
            timer: 2000
          });
          this.getCart()
          this.getValue()

        }, error => {
          console.log(error);
        });
      }
    });
  }
}
