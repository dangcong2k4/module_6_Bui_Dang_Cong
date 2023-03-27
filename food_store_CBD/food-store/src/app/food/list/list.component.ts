import { Component, OnInit } from '@angular/core';
import {FoodService} from "../../service/food.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // food = []
  foodList
  item: string;
  index = -1;
  constructor(private foodService:FoodService, private router:Router) {
    this.getAll()
  }

  ngOnInit(): void {
    window.scroll(0,300)
  }
  getAll() {
    this.foodService.getAll().subscribe(data => {
      console.log(data)
      this.foodList = data
    })
  }

  choice(id: number, name: string) {
    this.index = id;
    this.item = name;
  }


  delete(id: number): void {
    Swal.fire({
      title: 'Bạn có muốn xóa?',
      text: 'Món ăn: ' + this.item,
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
          this.getAll();
        }, error => {
          console.log(error);
        });
      }
    });
  }
}
