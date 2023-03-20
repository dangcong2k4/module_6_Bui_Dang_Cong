import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 300);
  }

}
