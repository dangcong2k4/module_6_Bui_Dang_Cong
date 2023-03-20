import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../service/food.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  food = []
  foodList
  constructor(private foodService:FoodService, private router:Router) {
    this.getAll()
  }

  ngOnInit(): void {
  }
  getAll() {
    this.foodService.getAll().subscribe(data => {
      console.log(data)
      this.foodList = data
    })
  }
}
