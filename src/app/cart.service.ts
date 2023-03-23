import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cartItem } from 'interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from './cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:cartItem[]=[];
  baseUrl=environment.baseURL;
  constructor(private http:HttpClient) { }
  cartSubject = new BehaviorSubject<any>([]);
  cartTotalSubject = new Subject<number>();
  cartBehaviour = new Subject<any>();

  addToCart(cartItem:CartItem){
       const existingItem = this.cart.find(i => i.id == cartItem.id);
       if(existingItem){
        existingItem.quantityCount += cartItem.quantityCount;
        existingItem.subtotal = existingItem.price * existingItem.quantityCount;
       }
       else{
        this.cart.push(cartItem);
       }
  }

  getCartItems(){
    return this.cart;
  }
}
