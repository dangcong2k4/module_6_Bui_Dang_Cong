import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../model/user";
import {TokenService} from "../service/JWT/token.service";
import {ShareService} from "../service/JWT/share.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../service/JWT/login.service";
import {CartService} from "../service/cart.service";
import {BillService} from "../service/bill.service";
import {BillHistoryService} from "../service/bill-history.service";
import {Bill} from "../model/bill";
import {PageFood} from "../model/pageFood";
import {PageBill} from "../model/page-bill";
import {BillHistory} from "../model/bill-history";
import {FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  isLogged = false;
  index = 1;
  ranks = 0;
  role = '';
  nameError = '';
  phoneNumberError = '';
  emailError = '';
  addressError = '';
  genderError = '';
  dateOfBirthError = '';
  avatarError = '';
  userForm: FormGroup;
  selectedImage: any = null;
  downloadURL: Observable<string> | undefined;
  fb: string | undefined;
  src: string | undefined;
  billHistory: BillHistory;
  pageBill: PageBill;
  passwordError = '';
  newPasswordError = '';
  confirmPasswordError = '';
  op: boolean;
  np: boolean;
  cp: boolean;
  isLoading = false;

  constructor(private token: TokenService, private share: ShareService, private router: Router,
              private loginService: LoginService,
              private billService: BillService, private billHistoryService: BillHistoryService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.userForm = new FormGroup({
      avatar: new FormControl(),
    });

  }

  form = new FormGroup({
    name: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    gender: new FormControl(''),
    dateOfBirth: new FormControl(''),
    avatar: new FormControl('')
  })
  formPassword = new FormGroup({
    password: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  })


  ngOnInit(): void {
    this.isLogged = this.token.isLogger()
    window.scrollTo(0,300)
    this.loader();
    this.getBill(0)
    this.getValue()
    this.share.getClickEvent().subscribe(next => {
      window.scrollTo(0,300)
      this.isLogged = this.token.isLogger()
      this.loader();
      this.getBill(0)
      this.getValue()

    })

  }

  loader() {
    if (this.isLogged) {
      this.loginService.profile(this.token.getId()).subscribe(
        next => {
          this.user = next;
          this.getValue()
          this.billService.showRankUser(this.token.getId()).subscribe(next => {
            this.ranks = next
          })
        }
      )
      this.role = this.token.getRole();
    }
  }

  setIndex(number) {
    this.index = number
  }

  getBill(pageNumber: number) {
    this.billService.findBillByIdUser(this.token.getId(), pageNumber).subscribe(next => {
      this.pageBill = next
    })
  }

  gotoPage(pageNumber: number) {
    this.getBill(pageNumber);
  }

  getValue() {
    this.form.controls.name.patchValue(this.user?.name);
    this.form.controls.phoneNumber.patchValue(this.user?.phoneNumber);
    this.form.controls.email.patchValue(this.user?.email);
    this.form.controls.gender.patchValue(this.user?.gender);
    this.form.controls.address.patchValue(this.user?.address);
    this.form.controls.dateOfBirth.patchValue(this.user?.dateOfBirth);
    this.form.controls.avatar.patchValue(this.user?.avatar);
    console.log(this.user.name)
  }

  showBillDetail(id) {
    this.index = 4
    this.billHistoryService.findBillHistoryById(id).subscribe(next => {
      this.billHistory = next
    })
  }

  changePassword() {
    this.passwordError = '';
    this.newPasswordError = '';
    this.confirmPasswordError = '';
    this.loginService.changePassword(this.formPassword.value).subscribe(
      next => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Chúc mừng ' + this.user.name + ' đã cập nhật mật khẩu thành công',
          showConfirmButton: false,
          timer: 2500
        })
        this.getForm();
        document.getElementById('dismiss2').click()
      }, error => {
        console.log(error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Thay đổi mật khẩu thất bại',
          showConfirmButton: false,
          timer: 2500
        })
        for (let i = 0; i < error.error.length; i++) {
          if (error.error[i].field == 'password') {
            this.passwordError = error.error[i].defaultMessage;
          } else if (error.error[i].field == 'newPassword') {
            this.newPasswordError = error.error[i].defaultMessage;
          } else if (error.error[i].field == 'confirmPassword') {
            this.confirmPasswordError = error.error[i].defaultMessage;
          }
        }
      }
    )
  }

  getForm() {
    this.formPassword = new FormGroup({
      password: new FormControl(''),
      newPassword: new FormControl(''),
      confirmPassword: new FormControl('')
    })
  }

  oldPassword() {
    this.op = !this.op;
  }

  newPassword() {
    this.np = !this.np;
  }

  confirmPassword() {
    this.cp = !this.cp;
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
              this.user.avatar = url;
            }
            this.userForm.patchValue({avatar: url});
            this.fb = url;
            this.isLoading = false;

            console.log('link', this.user.avatar);
          });
        })
      )
      .subscribe();

  }

  updateAvatar() {
    this.loginService.updateAvatar(this.token.getId(), this.user.avatar).subscribe(next => {
      Swal.fire({
        position: 'center',
        title: 'Chỉnh sửa thành công',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });
      this.share.sendClickEvent()

    })
  }

  update() {
    this.nameError = '';
    this.phoneNumberError = '';
    this.emailError = '';
    this.addressError = '';
    this.genderError = '';
    this.dateOfBirthError = '';
    this.avatarError = '';
    this.loginService.updateUser(this.form.value).subscribe(next => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Chúc mừng ' + this.form.controls.name.value + ' đã cập nhật thông tin thành công',
        showConfirmButton: false,
        timer: 2500
      })
      // document.getElementById('huy').click()
      this.share.sendClickEvent();
      this.loader();

    }, error => {
      console.log(this.form.value.dateOfBirth)
      console.log(this.form.value.name)
      console.log(this.form.value.phoneNumber)
      console.log(this.form.value.address)
      console.log(this.form.value.gender)
      console.log(this.form.value.email)
      console.log(this.form.value.avatar)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Vui lòng điền đầy đủ thông tin vào ông trống',
        showConfirmButton: false,
        timer: 2500
      })
      for (let i = 0; i < error.error.length; i++) {
        if (error.error[i].field == 'name') {
          this.nameError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'phoneNumber') {
          this.phoneNumberError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'email') {
          this.emailError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'address') {
          this.addressError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'dateOfBirth') {
          this.dateOfBirthError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'avatar') {
          this.avatarError = error.error[i].defaultMessage;
        }
      }
    })

  }
}
