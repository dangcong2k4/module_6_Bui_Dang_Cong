import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient:HttpClient) { }

  addBill(userId,total:number,time:string): Observable<any> {
    let dto = {
      userId:userId,
      time:time,
      total:total
    }
    return this.httpClient.post("http://localhost:8080/bill/buy", dto);
  }

  getAllPaymentMethod(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/bill/paymentMethod");
  }
  showRankUser(id): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/bill/ranks/"+id);
  }

  findBillByIdUser(id,page:number): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/bill/list/"+id+"?page="+page);
  }
  findAllBill(page:number): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/bill/list?page="+page);
  }

}
