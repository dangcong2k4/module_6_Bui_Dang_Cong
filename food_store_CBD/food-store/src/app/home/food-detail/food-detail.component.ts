import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../service/food.service";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../service/JWT/token.service";
import {Food} from "../../model/food";
import {CartService} from "../../service/cart.service";
import {FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {User} from "../../model/user";
import {LoginService} from "../../service/JWT/login.service";
import {ShareService} from "../../service/JWT/share.service";

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  food: Food;
  isLogged = false;
  user:User;
  // cartForm = new FormGroup({
  //   quantity : new FormControl(''),
  //   userId : new  FormControl(this.user.i),
  //   foodId : new FormControl(this.food.id)
  // })
  constructor(private foodService:FoodService, private activatedRoute: ActivatedRoute,
              private token:TokenService,private cartService: CartService,
              private loginService:LoginService,
              private shareService:ShareService) {

    this.foodService.findCommodityById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(next=>{
      this.food=next
      window.scrollTo(0, 300);
    })
  }

  ngOnInit(): void {
   this.isLogged = this.token.isLogger();
   this.loader();
   this.shareService.getClickEvent().subscribe(next => {
     this.isLogged = this.token.isLogger();
     this.loader();
   })
  }
  // buy() {
  //   this.token.buy(this.food);
  // }
  loader() {
    if (this.isLogged) {
      this.loginService.profile(this.token.getId()).subscribe( next => {
        this.user = next
      })
    }
  }

  addCart() {
    this.cartService.addCart(this.user.id,this.food.id,1).subscribe(next=>{
      Swal.fire({
        position: 'center',
        title: 'Thêm mới thành công'+ this.user.id,
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
  }
}
