import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {calculateThresholds} from "@angular-devkit/build-angular/src/angular-cli-files/utilities/bundle-calculator";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }

  addCart(userId,footId,quantity): Observable<any> {
    let dto = {
      userId:userId,
      foodId:footId,
      quantity:quantity
    }
    return this.httpClient.post("http://localhost:8080/cart/create", dto);
  }

  increaseQuantity(userId,footId): Observable<any> {
    let dto = {
      userId:userId,
      foodId:footId,
    }
    return this.httpClient.post("http://localhost:8080/cart/increase", dto);
  }

  reduceQuantity(userId,footId): Observable<any> {
    let dto = {
      userId:userId,
      foodId:footId,
    }
    return this.httpClient.post("http://localhost:8080/cart/reduce", dto);
  }



  showAllCart(id): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/cart/list/"+id)
  }

  delete(id: number) {
    return this.httpClient.delete<any>("http://localhost:8080/cart/delete/" + id)
  }
}
