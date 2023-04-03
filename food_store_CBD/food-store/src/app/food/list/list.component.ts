import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../service/food.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {PageFood} from "../../model/pageFood";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  item: string;
  index = -1;
  pageFood: PageFood;

  rfSearch: FormGroup;
  constructor(private foodService:FoodService,
              private formBuilder: FormBuilder,
              private router:Router) {
    // this.getAll()
  }

  ngOnInit(): void {
    window.scroll(0,600)
    this.searchFood();
    this.findByAllFood(0);

  }


  choice(id: number, name: string) {
    this.index = id;
    this.item = name;
  }


  delete(id: number): void {
    Swal.fire({
      title: 'Bạn có muốn xóa?',
      text: 'Món ăn: ' + this.item + this.index,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#BBBBBB',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.foodService.delete(id).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa thành công ',
            showConfirmButton: false,
            timer: 2000
          });
          this.index = -1;
          this.findByAllFood(0);
        }, error => {
          console.log(error);
        });
      }
    });
  }

  findByAllFood(pageNumber: number){
    this.foodService.findAllSearch(this.rfSearch.value,pageNumber).subscribe(
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
    this.findByAllFood(pageNumber);
  }

  cancel() {
    this.index = -1;
  }
}
