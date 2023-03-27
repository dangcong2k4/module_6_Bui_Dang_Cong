import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FoodService} from "../../service/food.service";
import Swal from "sweetalert2";
import {Food} from "../../model/food";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  foodForm: FormGroup;
  food: Food = {};
  selectedImage: any = null;
  downloadURL: Observable<string> | undefined;
  fb: string | undefined;
  src: string | undefined;
  constructor(private router:Router,private foodService:FoodService, private activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.foodForm = new FormGroup({
      id: new FormControl(''),
      name : new FormControl(''),
      image : new FormControl(),
      price : new FormControl(''),
      description : new FormControl('')
    });
    this.foodService.findCommodityById(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(next => {
      console.log(this.foodForm.patchValue(next));
      console.log(next);
      this.food = next;
    });
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const filePath = this.selectedImage.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              // lấy lại url
              this.food.image = url;
            }
            this.foodForm.patchValue({image: url});
            this.fb = url;
            console.log('link', this.food.image);
          });
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
  }
  editFood(){
    if(this.foodForm.valid){
      this.foodService.editFood(this.foodForm.value.id,this.foodForm.value).subscribe(next=>{
      this.router.navigateByUrl("/food")
        Swal.fire({
          position: 'center',
          title: 'Chỉnh sửa thành công',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
      }, error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Chỉnh sửa thất bại!',
          text: 'Chỉnh sửa thất bại',
          showConfirmButton: false,
          timer: 2000
        });
      })
    }else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Chỉnh sửa thất bại!',
        text: 'Chỉnh sửa thất bại vui lòng điền đúng tất cả thông tin',
        showConfirmButton: false,
        timer: 2000
      });
    }
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
