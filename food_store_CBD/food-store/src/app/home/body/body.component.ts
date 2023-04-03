import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FoodService} from "../../service/food.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ShareService} from "../../service/JWT/share.service";
import {CartService} from "../../service/cart.service";
import {Food} from "../../model/food";
import {User} from "../../model/user";
import {TokenService} from "../../service/JWT/token.service";
import {LoginService} from "../../service/JWT/login.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  foodList;
  food: Food;
  user:User;
  size:string = 'S';
  index: number;
  isLogged = false;
  constructor(private title:Title,private foodService:FoodService,private router:Router,
              private shareService:ShareService,private cartService:CartService,
              private token:TokenService,private loginService:LoginService,) {
    this.getAll()
  }

  ngOnInit(): void {
    this.title.setTitle('Trang Chủ');
    window.scrollTo(1900, 300);
    this.isLogged = this.token.isLogger();
    this.loader();
    this.shareService.getClickEvent().subscribe(next => {
      this.isLogged = this.token.isLogger();
      this.loader();
    })
  }
  loader() {
    if (this.isLogged) {
      this.loginService.profile(this.token.getId()).subscribe( next => {
        this.user = next
      })
    }
  }

  getAll() {
    this.foodService.showAll().subscribe(data => {
      console.log(data)
      this.foodList = data
    })
  }

  showDetail(id) {
    this.router.navigateByUrl('/detail/'+ id)
  }

  addCart(id) {
    if(!this.isLogged){
      Swal.fire({
        title: 'Bạn bạn hiện tại chưa đăng nhập',
        text: 'Bạn có muốn vào trang đăng nhập không?' ,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0099FF',
        cancelButtonColor: '#BBBBBB',
        confirmButtonText: 'Đăng nhập',
        cancelButtonText: 'Không'
      }).then((result) => {
        if (result.isConfirmed) {
          this.shareService.sendClickEvent()
          this.router.navigateByUrl('/login')
        }
      });
    }else {
      this.cartService.addCart(this.token.getId(),id,1,this.size).subscribe(next=>{
        Swal.fire({
          position: 'center',
          title: 'Đã thêm vào giỏ hàng thành công',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        });
        this.shareService.sendClickEvent()

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
    }
  }
}
