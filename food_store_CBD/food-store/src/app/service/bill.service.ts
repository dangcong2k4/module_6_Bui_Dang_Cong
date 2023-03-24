import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient:HttpClient) { }

  addBill(bill): Observable<any> {
    return this.httpClient.post("http://localhost:8080/bill/create", bill);
  }

  getAllPaymentMethod(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/bill/paymentMethod");
  }
}