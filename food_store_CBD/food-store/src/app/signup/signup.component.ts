import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";

import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {LoginService} from "../service/JWT/login.service";
import {User} from "../model/user";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User[]
  clickButton = false;
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(5)]),
    name: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required,Validators.minLength(12),Validators.maxLength(50),
      Validators.pattern('[a-zA-Z0-9]+@gmail.com')]),
    phoneNumber: new FormControl('', [Validators.required,Validators.minLength(9),Validators.maxLength(11),
      Validators.pattern('0[0-9]+')]),
    password: new FormControl('', [Validators.required,Validators.minLength(3)]),
    confirmPassword: new FormControl('',Validators.required),
    roles: new FormControl('customer')
  });
  nameError = '';
  usernameError = '';
  emailError = '';
  phoneNumberError = '';
  passwordError = '';
  confirmPasswordError = '';

  constructor(private title: Title, private loginService: LoginService, private route: Router) {
  }

  ngOnInit(): void {
    window.scrollTo(0,300)
    this.title.setTitle('Trang đăng kí')
  }
  checkUserName(name: string) {
    this.loginService.checkUsername(name).subscribe(
      next => {
        if(next == true) {
          this.registerForm.controls.username.setErrors({'invalidName': true})
        }
      }
    )
  }
  checkemail(name: string) {
    this.loginService.checkEmail(name).subscribe(
      next => {
        console.log(next)
        if(next == true) {
          this.registerForm.controls.email.setErrors({'invalidEmail': true})
        }
      }
    )
  }
  checkPhoneNumber(name: string) {
    this.loginService.checkPhoneNumber(name).subscribe(
      next => {
        console.log(next)
        if(next == true) {
          this.registerForm.controls.phoneNumber.setErrors({'invalidPhoneNumber': true})
        }
      }
    )
  }

  register() {
    this.nameError = '';
    this.usernameError = '';
    this.emailError = '';
    this.phoneNumberError = '';
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
        } else if (error.error[i].field == 'phoneNumber') {
          this.phoneNumberError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'password') {
          this.passwordError = error.error[i].defaultMessage;
        } else if (error.error[i].field == 'confirmPassword') {
          this.confirmPasswordError = error.error[i].defaultMessage;
        }
      }
      this.clickButton = true;
    })
  }
}
