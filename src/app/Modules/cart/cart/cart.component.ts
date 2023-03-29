import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cartItem } from 'interface';
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
    console.log(this.cartItems)
    // this.getTotal();
    this.cartService.cartItems$.subscribe((res)=>{
     this.cartItems= res;
    })
    this.cartService.cartGrandTotal.next(this.grandTotal);
    this.categoriesOfCartItems = this.cartService.getCategoryByProducts();
    console.log("getCategoryByProducts",this.categoriesOfCartItems);
  this.productsByCategory = this.cartService.getProductsByCategory();
  console.log("getProductsByCategory",this.productsByCategory);
  
    
    // this.cartService.cartTotalSubject.next(this.grandTotal);

  }
  categoriesOfCartItems:any;
  productsByCategory:any
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
  cancel(product:any) {
    const categoryArray = this.productsByCategory[product.category];
    const index = categoryArray.indexOf(product);
    if (index > -1) {
      categoryArray.splice(index, 1);
      this.productsByCategory[product.category].totalPrice -= product.price;
    }
    this.productsByCategory.splice(index, 1);
    this.getTotal();
    this.cartService.cartBehaviour.next(this.cartItems);
    this.getTotal();
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
