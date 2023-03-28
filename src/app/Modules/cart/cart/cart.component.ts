import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Shared/Services/cart/cart.service';
import { CartItem } from '../../../Shared/Interfaces/cartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.cartItems = this.cartService.getCartItems();
    this.getTotal();
    this.cartService.cartItems$.subscribe((res)=>{
     this.cartItems= res;
    })
    this.cartService.cartGrandTotal.next(this.grandTotal);
    // this.cartService.cartTotalSubject.next(this.grandTotal);
  }
  cartItems: CartItem[] = [];
  cartSubTotal: number = 0;
  GST: number = 0;
  grandTotal: number = 0;
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
    this.cartService.cartBehaviour.next(this.cartItems);
  }
  getTotal() {
    const subTotal = this.cartItems.map((product: any) => product.subtotal);
    this.cartSubTotal = subTotal.reduce((acc: number, curr: number) => {
      return acc + curr;
    }, 0);
    this.GST = this.cartSubTotal * (10 / 100);
    this.grandTotal = this.cartSubTotal + this.GST;
  }
  checkout() {
    if (this.cartItems.length > 0) {
      console.log(this.cartItems);
      
      this.cartService.cartGrandTotal.next(this.grandTotal);
      this.router.navigate(['cart/myCart/checkout']);
    }else{
      alert("empty cart");
    }
  }
}
