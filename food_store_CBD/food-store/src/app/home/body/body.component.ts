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
import {PageFood} from "../../model/pageFood";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BillHistory} from "../../model/bill-history";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  foodList;
  billHis:BillHistory;
  food: Food;
  user:User;
  role='';
  pageFood: PageFood;
  rfSearch: FormGroup;
  size:string = 'S';
  index: number;
  isLogged = false;
  constructor(private title:Title,private foodService:FoodService,private router:Router,
              private shareService:ShareService,private cartService:CartService,
              private token:TokenService,private loginService:LoginService,private formBuilder: FormBuilder) {
    this.getAll()
    this.getAll2()
  }
  getAll2() {
    this.foodService.getAll().subscribe(data => {
      console.log(data)
      this.billHis = data
    })
  }
  ngOnInit(): void {
    this.searchFood();
    this.findByAllFood(0);
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
      this.role = this.token.getRole()
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
  findByAllFood(pageNumber: number){
    this.foodService.findAllList(this.rfSearch.value,pageNumber).subscribe(
      data => {
        this.pageFood = data;
      }
    )
  }

  searchFood(){
    this.rfSearch = this.formBuilder.group({
      priceMin: [0],
      priceMax: [10000000],
      name: [""]
    })
  }
  setSearch(number:string) {
    let arr = number.split(",")
    let priceMin = parseInt(arr[0]);
    let priceMax = parseInt(arr[1]);
    // alert(priceMin+" va "+priceMax)
    this.rfSearch.setValue({
      name: this.rfSearch.value.name,
      priceMin,
      priceMax,
    });
    this.findByAllFood(0);
  }

  gotoPage(pageNumber: number) {
    window.scrollTo(0,300);
    this.findByAllFood(pageNumber);
  }
}
