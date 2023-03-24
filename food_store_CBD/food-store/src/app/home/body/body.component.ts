import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FoodService} from "../../service/food.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  foodList
  constructor(private title:Title,private foodService:FoodService,private router:Router) {
    this.getAll()
  }

  ngOnInit(): void {
    this.title.setTitle('Trang Chủ');
    window.scrollTo(1900, 300);
  }

  getAll() {
    this.foodService.showAll().subscribe(data => {
      console.log(data)
      this.foodList = data
    })
  }

  // showFood(id: number){
  //   this.foodService.findCommodityById(id)
  //   alert(id)
  //   this.router.navigateByUrl('/detail')
  // }

}
