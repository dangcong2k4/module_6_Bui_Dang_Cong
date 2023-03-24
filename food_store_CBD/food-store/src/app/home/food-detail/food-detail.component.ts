import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../service/food.service";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../../service/JWT/token.service";
import {Food} from "../../model/food";

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  food: Food;
  constructor(private foodService:FoodService, private activatedRoute: ActivatedRoute,private token:TokenService) {
    this.foodService.findCommodityById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(next=>{
      this.food=next
    })
  }

  ngOnInit(): void {
    window.scrollTo(1900, 300);
  }
  buy() {
    this.token.buy(this.food);
  }
}
