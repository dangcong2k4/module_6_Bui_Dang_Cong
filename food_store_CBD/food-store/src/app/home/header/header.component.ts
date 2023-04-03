import {AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TokenService} from "../../service/JWT/token.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {LoginService} from "../../service/JWT/login.service";
import {ShareService} from "../../service/JWT/share.service";
import {Subscription} from "rxjs";
import {CartService} from "../../service/cart.service";
import {Cart} from "../../model/cart";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cart:Cart[] = []

  role = 'none';
  user:User
  name = 'Đăng nhập'
  isLogged = false;
  message:string;
  subscription: Subscription;
  total: number;
  quantity: number;
  constructor(private token: TokenService,private share:ShareService,private router: Router,private loginService:LoginService,private cartService:CartService) {
    // this.token.getUserNameLoggedIn().subscribe(next => {this.name = next
    //   this.isLogged = this.token.isLogger();
    //   this.loader();
    //   this.getCart()
    //   this.getQuantity()
    //   this.share.getClickEvent().subscribe(next => {
    //     this.loader()
    //     this.getCart()
    //     this.getQuantity()
    //   })
    // });
  }

  ngOnInit(): void {
    this.isLogged = this.token.isLogger()
    this.loader();
    this.getCart();
    this.getQuantity()
    this.share.getClickEvent().subscribe(next => {
      this.isLogged = this.token.isLogger()
      this.loader()
      this.getCart()
      this.getQuantity()
    })

  }

  getCart(){
    this.cartService.showAllCart(this.token.getId()).subscribe(next=>{
      this.cart = next;
      this.getQuantity()
    })
  }


  getQuantity() {
    this.total = 0
    if (this.cart != null) {
      for (let i = 0; i < this.cart.length; i++) {
        this.total +=  this.cart[i].quantity
      }
    }
  }

  login(){
    // this.role = 'logout'
    // this.isLogged = this.token.isLogger();
    // if (this.isLogged) {
    //   this.loader();
    //   this.share.getClickEvent().subscribe(
    //     next => {
    //       this.loader()
    //       this.ngOnInit()
    //     }
    //   )
    // }
    this.router.navigateByUrl('/login')
  }
  loader() {
    if(this.isLogged) {
      this.loginService.profile(this.token.getId()).subscribe(
        next => {
          this.user = next;
        }
      )
    }

  }
  logout() {
    this.role = 'none';
    this.name = 'Đăng nhập';
    this.isLogged = false;
    this.token.logout();
    this.router.navigateByUrl('/');
  }




}
