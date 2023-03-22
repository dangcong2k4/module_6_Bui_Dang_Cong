import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../service/food.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  food
  constructor(private foodService:FoodService, private activatedRoute: ActivatedRoute) {
    this.foodService.findCommodityById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(next=>{
      this.food=next
    })
  }

  ngOnInit(): void {
  }

}
