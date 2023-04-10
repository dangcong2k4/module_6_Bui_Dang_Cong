import {Component, OnInit} from '@angular/core';
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
import {render} from 'creditcardpayments/creditCardPayments';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  billForm: FormGroup;
  cart: Cart[] = []
  payment: PaymentMethod[] = [];
  user: User
  food: Food;
  quantity = 0;
  total = 0;
  isLogged = false;
  isPaypal = false;
  constructor(private token: TokenService, private billService: BillService, private cartService: CartService,
              private loginService: LoginService, private shareService: ShareService, private router: Router) {
    this.billService.getAllPaymentMethod().subscribe(next => {
      this.payment = next
    });
    this.getCart();
    this.shareService.getClickEvent().subscribe(next => {
      this.getCart()
    })

  }

  ngOnInit(): void {

    this.isLogged = this.token.isLogger();
    this.loader();
    this.shareService.getClickEvent().subscribe(next => {
      this.isLogged = this.token.isLogger();
      this.loader();
      this.getCart()
    })
    if (!this.token.isLogger()) {
      this.router.navigateByUrl('/home')
    } else {
      this.getValue();
    }
  }

  loader() {
    if (this.isLogged) {
      this.loginService.profile(this.token.getId()).subscribe(next => {
        this.user = next
      })
    }
  }

  paypal(){
    this.isPaypal = true
    let money = +((this.total+20000)/23485.5).toFixed(2)
    render({
      currency: "USD",
      id: "#paypal",
      value: String(money),
      onApprove: (details) => {
        this.addBill();
        this.shareService.getClickEvent()
      }
    })
  }



  getCart() {
    this.cartService.showAllCart(this.token.getId()).subscribe(next => {
      this.cart = next;
      this.getValue()
    })
  }

  addBill() {
    let currentTime = new Date();
    let formatTime = currentTime.toLocaleString();
    this.billService.addBill(this.token.getId(), this.total, formatTime).subscribe(next => {
      Swal.fire({
        position: 'center',
        title: 'Đã thanh toán thành công',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });
      this.cart = []
      this.loader()

      this.shareService.sendClickEvent()
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Thanh toán thất bại!',
        text: 'Thanh toán thất bại',
        showConfirmButton: false,
        timer: 2000
      });
    })

  }

  getValue() {
    this.total = 0
    if (this.cart != null) {
      this.quantity = this.cart.length;
      for (let i = 0; i < this.cart.length; i++) {
        this.total += this.cart[i].foodId.price * this.cart[i].quantity
      }
    }
  }

  stepUp(userId: number, foodId: number, size: string) {
    this.cartService.increaseQuantity(userId, foodId, size).subscribe(next => {
      this.shareService.sendClickEvent()
      this.getCart()
      this.getValue();
    })
  }

  stepDown(userId: number, foodId: number, size: string) {
    this.cartService.reduceQuantity(userId, foodId, size).subscribe(next => {
      this.shareService.sendClickEvent()
      this.getCart()
      this.getValue()
    })

  }

  delete(id: number, name: string) {
    Swal.fire({
      title: 'Bạn có muốn xóa Khỏi giỏ hàng?',
      text: 'Món ăn: ' + name,
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
            title: 'Xóa thành công món ăn: '+ name,
            showConfirmButton: false,
            timer: 1000
          });
          this.shareService.sendClickEvent()
          this.getCart()
          this.cart=[]
          this.getValue()
        }, error => {
          console.log(error);
        });
      }
    });
  }

  setSize(value: string, cart:number,foodId:number,userId:number, nameFood:string) {
    for (let i = 0; i < this.cart.length; i++) {
      if(this.cart[i].size==value && this.cart[i].foodId.id == foodId && parseInt(this.token.getId()) == userId) {
        Swal.fire({
          title: 'đã có size này rồi!',
          text: 'Món ăn: ' + '"' + nameFood + '"' + ' đã có size: ' + '"' + value + '"' + ' rồi nhé!',
          iconHtml: '<img src="' + this.cart[i].foodId.image + '" style="width:165px;height: 160px;object-fit: cover">',
          cancelButtonColor: '#0099FF',
          cancelButtonText: 'Đã hiểu'
        })
        this.getCart()
        this.getValue()
        return
      }
    }
    this.cartService.editCart(value, cart,foodId,userId).subscribe(next => {
      this.getCart()
      this.getValue();
    })
    this.shareService.sendClickEvent()
  }

}
