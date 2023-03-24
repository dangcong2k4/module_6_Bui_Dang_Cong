import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FoodService} from "../../service/food.service";
import {FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  foodForm: FormGroup;
  constructor(private router:Router,private foodService:FoodService) {
    this.foodForm = new FormGroup({
      name : new FormControl(''),
      image : new  FormControl(''),
      price : new FormControl(''),
      description : new FormControl('')
    })
  }

  ngOnInit(): void {
  }
  addFood(){
    if(this.foodForm.valid){
      this.foodService.addFood(this.foodForm.value).subscribe(next=>{
        Swal.fire({
          position: 'center',
          title: 'Thêm mới thành công',
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
    }else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Thêm mới thất bại!',
        text: 'Thêm mới thất bại vui lòng điền đúng tất cả thông tin',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }
}
