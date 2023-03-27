import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Title} from "@angular/platform-browser";

import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {LoginService} from "../service/JWT/login.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    roles: new FormControl('customer')
  });
  nameError = '';
  usernameError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';
  constructor(private title:Title,private loginService: LoginService,private route:Router) { }

  ngOnInit(): void {
    this.title.setTitle('Trang đăng kí')
  }
  register() {
    this.nameError = '';
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
    this.loginService.register(this.registerForm.value).subscribe(next => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đăng kí thành công!',
        text: 'Chúc mừng ' + this.registerForm.controls.name.value + ' đã có tài khoản',
        showConfirmButton: false,
        timer: 2000
      });
      this.route.navigateByUrl('/login')
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Đăng kí thất bại!',
        text: 'Vui lòng điền thông tin đầy đủ',
        showConfirmButton: false,
        timer: 2000
      })
      for (let i = 0; i < error.error.length; i++) {
        if (error.error[i].field == 'name') {
          this.nameError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'username') {
          this.usernameError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'email') {
          this.emailError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'password') {
          this.passwordError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'confirmPassword') {
          this.confirmPasswordError = error.error[i].defaultMessage;
        }
      }
    })
  }
}
