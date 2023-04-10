import { Component, OnInit } from '@angular/core';
import {BillService} from "../service/bill.service";
import {PageBill} from "../model/page-bill";
import {ShareService} from "../service/JWT/share.service";
import {TokenService} from "../service/JWT/token.service";
import {LoginService} from "../service/JWT/login.service";
import {User} from "../model/user";
import {BillHistoryService} from "../service/bill-history.service";
import {BillHistory} from "../model/bill-history";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  pageBill: PageBill;
  user: User;
  isLogged = false;
  index = 0;
  billHistory: BillHistory;
  constructor(private billService:BillService,private shareService:ShareService,
              private token:TokenService,private loginService: LoginService,
              private billHistoryService:BillHistoryService) { }

  ngOnInit(): void {
    this.isLogged = this.token.isLogger()
    this.loader();
    this.getBill(0)
    this.shareService.getClickEvent().subscribe(next => {
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
        }
      )
    }
  }
  getBill(pageNumber: number){
    this.billService.findAllBill(pageNumber).subscribe(next=>{
      this.pageBill = next
    })
  }

  showBillDetail(id) {
    this.index = 1
    this.billHistoryService.findBillHistoryById(id).subscribe(next=>{
      this.billHistory= next
    })
  }
  gotoPage(pageNumber: number) {
    window.scrollTo(0,300);
    this.getBill(pageNumber);
  }
}
