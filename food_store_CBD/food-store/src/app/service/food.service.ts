import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/food/list")
  }
  showAll(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/food/show")
  }

  findCommodityById(id): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/food/" + id);

  }

}
