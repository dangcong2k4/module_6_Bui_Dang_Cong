import { Injectable } from '@angular/core';
import {Cart} from "../../model/cart";
import {Observable, Subject} from "rxjs";
import {Food} from "../../model/food";
import Swal from "sweetalert2";


const TOKEN = 'Token_key';
const ID = 'Id_key';
const NAME = 'Name_key';
const USERNAME = 'Username_key';
const PHONENUMBER = 'PhoneNumber';
const EMAIL = 'Email_key';
const ADDRESS = 'Address_key';
const AGE = 'Age_key';
const GENDER = 'Gender_key';
const DATEOFBIRTH = 'DateOfBirth_key';
const AVATAR = 'Avatar_key';
const ROLE = 'Role_key';
const STORAGE = 'Storage_key';
const CART = 'Cart_key';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  json = '';
  cart: Cart[] = [];
  isUserNameObservable = new Subject<any>();

  constructor() { }
  isLogger() {
    return !!this.getToken();
  }
  public clearCart() {
    window.sessionStorage.clear();

  }
  public setStorage(storage: string) {
    localStorage.removeItem(STORAGE);
    localStorage.setItem(STORAGE,storage);
    sessionStorage.removeItem(STORAGE);
    sessionStorage.setItem(STORAGE,storage);
  }

  public getStorage(){
    this.setCart(this.cart);
    if (localStorage.getItem(STORAGE) == 'local' || sessionStorage.getItem(STORAGE) == 'local') {
      return localStorage.getItem(STORAGE);
    }else {
      return sessionStorage.getItem(STORAGE);
    }
  }

  public buy(food:Food) {
    let cart = {
      id: food.id,
      name: food.name,
      image: food.image,
      description:food.description,
      price: food.price,
      quantity: 0
    }
    if (this.getCart() == undefined) {
      cart.quantity = 1;
      this.cart.push(cart)
      this.setCart(this.cart)
    } else {
      this.cart = this.getCart();
      if (this.checkExist(cart.id)) {
        this.upQuantity(cart.id,this.cart)
        this.setCart(this.cart);
      } else {
        cart.quantity = 1
        this.cart.push(cart)
        this.setCart(this.cart);
      }
    }
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'them vao gio thành công!',
      text: 'Ban da them san pham ' + cart.name + ' vao gio hang',
      showConfirmButton: false,
      timer: 1000
    });
  }

  public stepUp(index:number) {
    this.cart = this.getCart();
    this.cart[index].quantity += 1;
    this.setCart(this.cart)
  }
  public stepDown(index:number) {
    this.cart = this.getCart();
    if (this.cart[index] == 1) {
      this.cart.splice(index,1)
    } else {
      this.cart[index].quantity -= 1
    }
    this.setCart(this.cart)

  }

  public setCart(cart: Cart[]) {
    sessionStorage.removeItem(CART);
    sessionStorage.setItem(CART,JSON.stringify(cart));
  }
  public upQuantity(id: number,carts: Cart[]) {
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].id == id) {
        carts[i].quantity += 1;
        break
      }
    }
  }
  public checkExist(id: number) {
    for (let i = 0; i < this.getCart().length; i++) {
      if (this.getCart()[i].id == id) {
        return true;
      }
    }
    return false;
  }
  public getCart() {
    const carts = sessionStorage.getItem(CART);
    if(carts == 'undefined' || carts == undefined) {
      return this.cart;
    } else {
      this.cart = JSON.parse(carts);
      return this.cart;
    }


  }
  public setToken(token: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(TOKEN);
      localStorage.setItem(TOKEN,token);
    } else {
      sessionStorage.removeItem(TOKEN);
      sessionStorage.setItem(TOKEN,token);
    }
  }
  public getToken() {
    if (this.getStorage() == 'local') {
    return localStorage.getItem(TOKEN);
  } else {
      return sessionStorage.getItem(TOKEN);
    }
  }

  public setId(id : string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(ID);
      localStorage.setItem(ID,id);
    } else {
      sessionStorage.removeItem(ID);
      sessionStorage.setItem(ID,id);
    }
  }
  public getId() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(ID);
    } else {
      return sessionStorage.getItem(ID);
    }
  }
  public setName(name: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(NAME);
      localStorage.setItem(NAME,name);
    } else {
      sessionStorage.removeItem(NAME);
      sessionStorage.setItem(NAME,name);
    }
  }
  public getName() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(NAME);
    } else {
      return sessionStorage.getItem(NAME);
    }
  }
  public setUsername(username: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(USERNAME);
      localStorage.setItem(USERNAME,username);
    } else {
      sessionStorage.removeItem(USERNAME);
      sessionStorage.setItem(USERNAME,username);
    }
  }
  public getUsername() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(USERNAME);
    } else {
      return sessionStorage.getItem(USERNAME);
    }
  }
  public setPhoneNumber(number: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(PHONENUMBER);
      localStorage.setItem(PHONENUMBER,number);
    } else {
      sessionStorage.removeItem(PHONENUMBER);
      sessionStorage.setItem(PHONENUMBER,number);
    }
  }
  public getPhoneNumber() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(PHONENUMBER);
    } else {
      return sessionStorage.getItem(PHONENUMBER);
    }
  }
  public setEmail(email: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(EMAIL);
      localStorage.setItem(EMAIL,email);
    } else {
      sessionStorage.removeItem(EMAIL);
      sessionStorage.setItem(EMAIL,email);
    }
  }
  public getEmail() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(EMAIL);
    } else {
      return sessionStorage.getItem(EMAIL);
    }
  }
  public setAge(age: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(AGE);
      localStorage.setItem(AGE,age);
    } else {
      sessionStorage.removeItem(AGE);
      sessionStorage.setItem(AGE,age);
    }
  }
  public getAge() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(AGE);
    } else {
      return sessionStorage.getItem(AGE);
    }
  }
  public setAddress(address: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(ADDRESS);
      localStorage.setItem(ADDRESS,address);
    } else {
      sessionStorage.removeItem(ADDRESS);
      sessionStorage.setItem(ADDRESS,address);
    }
  }
  public getAddress() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(ADDRESS);
    } else {
      return sessionStorage.getItem(ADDRESS);
    }
  }


  public setGender(gender: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(GENDER);
      localStorage.setItem(GENDER,gender);
    } else {
      sessionStorage.removeItem(GENDER);
      sessionStorage.setItem(GENDER,gender);
    }
  }
  public getGender() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(GENDER);
    } else {
      return sessionStorage.getItem(GENDER);
    }
  }
  public setDateOfBirth(date: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(DATEOFBIRTH);
      localStorage.setItem(DATEOFBIRTH,date);
    } else {
      sessionStorage.removeItem(DATEOFBIRTH);
      sessionStorage.setItem(DATEOFBIRTH,date);
    }
  }
  public getDateOfBirth() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(DATEOFBIRTH);
    } else {
      return sessionStorage.getItem(DATEOFBIRTH);
    }
  }
  public setAvatar(avatar: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(AVATAR);
      localStorage.setItem(AVATAR,avatar);
    } else {
      sessionStorage.removeItem(AVATAR);
      sessionStorage.setItem(AVATAR,avatar);
    }
  }
  public getAvatar() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(AVATAR);
    } else {
      return sessionStorage.getItem(AVATAR);
    }
  }
  public setRole(role: string[]) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(ROLE);
      localStorage.setItem(ROLE,JSON.stringify(role));
    } else {
      sessionStorage.removeItem(ROLE);
      sessionStorage.setItem(ROLE,JSON.stringify(role));
    }
  }
  public getRole(): string {
    if (this.getStorage() == 'local') {
      let roles = JSON.parse(<string> localStorage.getItem(ROLE));
     return roles[0].authority;
    } else {
      let roles = JSON.parse(<string> sessionStorage.getItem(ROLE));
      return roles[0].authority;
    }
  }

  rememberMe(token,id,name,username,phonenumber,email,address,age,gender,dateOfBirth,avatar,roles,storage) {
   this.setStorage(storage);
    this.setToken(token);
    this.setId(id);
    this.setName(name);
    this.setUsername(username);
    this.setPhoneNumber(phonenumber);
    this.setEmail(email);
    this.setAddress(address);
    this.setAge(age);
    this.setGender(gender);
    this.setDateOfBirth(dateOfBirth);
    this.setAvatar(avatar);
    this.setRole(roles);
  }
  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
  setIsLoggedIn(name: any) {
    this.isUserNameObservable.next(name);
  }
  getUserNameLoggedIn(): Observable<any> {
    return this.isUserNameObservable.asObservable();
  }
}
