import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cartItem } from 'interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../../Interfaces/cartItem';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cart:CartItem[]=[];
  baseUrl=environment.baseURL;
  constructor(private http:HttpClient,private productService:ProductsService) { }

  cartBehaviour = new Subject<any>();//category cart items
  cartItems$ = this.cartBehaviour.asObservable();
  cartGrandTotal = new BehaviorSubject<any>(0);
  grandTotal$ = this.cartGrandTotal.asObservable();

  addToCart(id:any){
    const cartProduct = this.productService.getProductById(id)
    const cartItems:CartItem = {
      id:Number(cartProduct?.id),
      grocery_name:String(cartProduct?.grocery_name),
      price:Number(cartProduct?.price),
      shop:String(cartProduct?.store),
      discPrice:Number(cartProduct?.discountPrice),
      quantity:1, 
      quantityCount:1,
      category:String(cartProduct?.category),
      subtotal:Number(cartProduct?.price),
      imageUrl:String(cartProduct?.imageUrl),
    }
       const existingItem = this.cart.find(i => i.id == cartItems.id);
       if(existingItem){
        existingItem.quantityCount += cartItems.quantityCount;
        existingItem.subtotal = existingItem.price * existingItem.quantityCount;
       }
       else{
        this.cart.push(cartItems);
       }
  }

  getCartItems(){
    return this.cart;
  }
  getProductsByCategory(){
    let products = this.cart.reduce((result:any,product)=>{
      (result[product.category] =result[product.category]||[]).push(product);
      result[product.category].totalPrice = (result[product.category].totalPrice || 0)+product.discPrice;
      return result; 
    },{})
    return products
  }
  getCategoryByProducts(){
    let category = this.cart.map(product=>product.category)
    return Array.from(new Set(category));
  }

}
