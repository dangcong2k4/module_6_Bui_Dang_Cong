import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../service/JWT/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role = 'none';
  name = 'Đăng nhập'
  isLogged = false;
  constructor(private token: TokenService,private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
  }

  logout() {
    this.role = 'none';
    this.name = 'Đăng nhập';
    this.isLogged = false;
    this.token.logout();
    this.router.navigateByUrl('/');
  }
}
