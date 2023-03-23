import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { CartItem } from '../../../cartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.cartItems = this.cartService.getCartItems();
    this.getTotal();
    this.cartService.cartTotalSubject.next(this.grandTotal);
  }
  cartItems: CartItem[] = [];
  cartSubTotal:number = 0;
  GST:number = 0;
  grandTotal:number = 0;
  itemMinus(id: number) {
    console.log('cartItesm', this.cartItems);
    this.cartItems.forEach((res) => {
      if (res.id === id && res.quantityCount >= 1) {
        res.quantityCount = res.quantityCount - 1;
        res.subtotal = res.subtotal - res.price;
      }
    });
    this.getTotal();
  }
  itemPlus(id: number) {
    this.cartItems.forEach((res) => {
      if (res.id === id) {
        res.quantityCount = res.quantityCount + 1;
        res.subtotal = res.subtotal + res.price;
      }
    });
    this.getTotal();
  }
  cancel(id: number) {
    const index = this.cartItems.findIndex((res) => {
      return res.id === id;
    });
    this.cartItems.splice(index, 1);
    this.getTotal();
  }
  getTotal() {
    const subTotal = this.cartItems.map((product:any)=>product.subtotal)
    this.cartSubTotal = subTotal.reduce((acc:number,curr:number) => {
      return acc + curr;} ,0);
    this.GST = this.cartSubTotal*(10/100);
    this.grandTotal = this.cartSubTotal+this.GST;
    
  }
}
