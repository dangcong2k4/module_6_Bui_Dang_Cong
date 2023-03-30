import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../service/food.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {PageFood} from "../../model/pageFood";

@Component({
  selector: 'app-trash-can',
  templateUrl: './trash-can.component.html',
  styleUrls: ['./trash-can.component.css']
})
export class TrashCanComponent implements OnInit {
  pageFood: PageFood;
  item: string;
  index = -1;
  constructor(private foodService:FoodService, private router:Router) {
    // this.getTrashCan()
  }

  ngOnInit(): void {
    this.getTrashCan(0);
    window.scroll(0,300)
  }

  getTrashCan(pageNumber: number) {
    this.foodService.getAllTrashCan(pageNumber).subscribe(data => {
      console.log('data' + data)
      this.pageFood = data
    }
    )
  }
  gotoPage(pageNumber: number) {
    this.getTrashCan(pageNumber);
  }

  choice(id: number, name: string) {
    this.index = id;
    this.item = name;
  }
  restore(id: number): void {
    Swal.fire({
      title: 'Bạn có muốn khôi phục lại món ăn này?',
      text: 'Món ăn: ' + this.item,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#BBBBBB',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.foodService.restore(id).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: ' Khôi phục thành công ',
            showConfirmButton: false,
            timer: 1500
          });
          this.index = -1;
          this.getTrashCan(0);
        }, error => {
          console.log(error);
        });
      }
    });
  }
}
