import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FoodService} from "../../service/food.service";
import {FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  foodForm: FormGroup;
  selectedImage: any = null;
  url: any;
  isLoading = false;
  downloadURL: Observable<string> | undefined;
  fb: string | undefined;
  src: string | undefined;

  constructor(private router:Router,private foodService:FoodService, private storage: AngularFireStorage) {
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
        this.router.navigateByUrl('/food')
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
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const filePath = this.selectedImage.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);
    this.isLoading = true
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.isLoading = true
              this.fb = url;
            }
            this.foodForm.patchValue({image: url});
            this.src = url;
            this.isLoading = false
            console.log('link: ', this.fb);
            this.src = url;

            // console.log('link: ', this.fb);
          });
        })
      )
      .subscribe();
  }

  cancel() {
    Swal.fire({
      title: 'Bạn có muốn thoát khỏi trang chỉnh sửa?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#BBBBBB',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl("/food")
      }
    });
  }
}
