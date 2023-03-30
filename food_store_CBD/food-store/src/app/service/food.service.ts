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
  getAllTrashCan(page): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/food/TrashCan?page=" + page)
  }


  showAll(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/food/show")
  }

  findCommodityById(id): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/food/detail/" + id);
  }

  delete(id: number) {
    return this.httpClient.delete<any>("http://localhost:8080/food/delete/" + id)
  }
  restore(id: number) {
    return this.httpClient.delete<any>("http://localhost:8080/food/restore/" + id)
  }
  addFood(food): Observable<any> {
    return this.httpClient.post("http://localhost:8080/food/create", food);
  }

  editFood(id, food): Observable<any> {
    return this.httpClient.put<any>("http://localhost:8080/food/edit/" + id, food);
  }

  findAllSearch(search, page): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/food/search" + "?page=" + page , search);
  }


}
