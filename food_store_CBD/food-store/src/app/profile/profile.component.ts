import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {TokenService} from "../service/JWT/token.service";
import {ShareService} from "../service/JWT/share.service";
import {Router} from "@angular/router";
import {LoginService} from "../service/JWT/login.service";
import {CartService} from "../service/cart.service";
import {BillService} from "../service/bill.service";
import {BillHistoryService} from "../service/bill-history.service";
import {Bill} from "../model/bill";
import {PageFood} from "../model/pageFood";
import {PageBill} from "../model/page-bill";
import {BillHistory} from "../model/bill-history";

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
  billHistory: BillHistory;
  pageBill: PageBill;
  constructor(private token: TokenService, private share: ShareService, private router: Router,
              private loginService: LoginService,
              private billService: BillService,private billHistoryService:BillHistoryService) {

  }

  ngOnInit(): void {
    this.isLogged = this.token.isLogger()
    this.loader();
    this.getBill(0)
    this.share.getClickEvent().subscribe(next => {
      this.isLogged = this.token.isLogger()
      this.loader();
      this.getBill(0)
    })
  }

  loader() {
    if (this.isLogged) {
      this.loginService.profile(this.token.getId()).subscribe(
        next => {
          this.user = next;
          this.billService.showRankUser(this.token.getId()).subscribe(next => {
            this.ranks = next
          })
        }
      )
    }
  }
  setIndex(number) {
    this.index = number
  }
  getBill(pageNumber: number){
    this.billService.findBillByIdUser(this.token.getId(),pageNumber).subscribe(next=>{
      this.pageBill = next
    })
  }
  gotoPage(pageNumber: number) {
    this.getBill(pageNumber);
  }


  showBillDetail(id) {
    this.index = 4
    this.billHistoryService.findBillHistoryById(id).subscribe(next=>{
      this.billHistory= next
    })
  }
}
