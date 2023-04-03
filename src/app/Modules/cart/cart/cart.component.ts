import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grocery } from 'src/app/Shared/Interfaces/groceryInterface';
import { ApiService } from 'src/app/Shared/Services/api/api.service';
import { CartService } from 'src/app/Shared/Services/cart/cart.service';
import { CartItem } from '../../../Shared/Interfaces/cartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private api: ApiService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.api.getCartData().subscribe((res) => {
      this.cartItems = res;
      console.log('hello', this.cartSubTotal);
      this.categoriesOfCartItems = this.getCategoryByProducts();
      console.log('getCategoryByProducts', this.categoriesOfCartItems);
      
      this.productsByCategory = this.getProductsByCategory();
      // this.cartService.getTotal();
      console.log('getProductsByCategory', this.productsByCategory);
      this.getTotal();
    });


  }
  categoriesOfCartItems: string[] = [];
  productsByCategory: any;
  cartItems: any;
  cartSubTotal: number = 0;
  GST: number = 0;
  grandTotal: number = 0;
  cartItemCount: number = 0;
  categoryWiseTotal: any;
  getProductsByCategory() {
    let products = this.cartItems.reduce(
      (result: any, product: { category: string | number; discPrice: any }) => {
        (result[product.category] = result[product.category] || []).push(
          product
        );
        result[product.category].totalPrice =
          (result[product.category].totalPrice || 0) + product.discPrice;
        return result;
      },
      {}
    );
    return products;
  }
  getCategoryByProducts(): string[] {
    let category = this.cartItems.map(
      (product: { category: string }) => product.category
    );

    return Array.from(new Set(category));
  }
  itemPlus(product: CartItem) {
    product.quantityCount++;
    if (product.discPrice) {
      product.subtotal = product.quantityCount * product.discPrice;
    } else {
      product.subtotal = product.quantityCount * product.price;
    }

    this.api.updateItem(product).subscribe({
      next: (res) => {
        console.log(res);
        this.api.getCartData().subscribe((res) => {
          this.cartItems = res;
          // console.log('cartItems', this.cartItems);
          this.getTotal();
        });
      },
      error: (error) => {
        console.log('from itemPlus', error);
      },
    });
  }
  itemMinus(product: CartItem) {
    if (product.quantityCount > 1) {
      product.quantityCount--;
      if (product.discPrice) {
        product.subtotal = product.quantityCount * product.discPrice;
      } else {
        product.subtotal = product.quantityCount * product.price;
      }
    }
    if(product.quantityCount==0){
      this.api.deleteProduct(product).subscribe((res)=>{
        console.log(res);
        this.api.getCartData().subscribe((res) => {
          this.cartItems = res;
          this.categoriesOfCartItems = this.getCategoryByProducts();
          // console.log('getCategoryByProducts', this.categoriesOfCartItems);
          this.productsByCategory = this.getProductsByCategory();
          // console.log('getProductsByCategory', this.productsByCategory);
          // console.log('cartItems', this.cartItems);

          this.getTotal();
        },(err)=>{
          console.log(err);
          
        })
      })
      return;
    }

    this.api.updateItem(product).subscribe({
      next: (res) => {
        console.log(res);
        this.api.getCartData().subscribe((res) => {
          this.cartItems = res;
          // console.log('cartItems', this.cartItems);
          this.getTotal();
        });
      },
      error: (error) => {
        console.log('from itemMinus', error);
      },
    });
    return;
  }
  cancel(product: CartItem) {
    this.api.deleteProduct(product).subscribe({
      next: (res) => {
        console.log(res);
        this.api.getCartData().subscribe((res) => {
          this.cartItems = res;
          this.categoriesOfCartItems = this.getCategoryByProducts();
          // console.log('getCategoryByProducts', this.categoriesOfCartItems);
          this.productsByCategory = this.getProductsByCategory();
          // console.log('getProductsByCategory', this.productsByCategory);
          console.log('cartItems', );
          this.cartService.cartDataSubject.next(this.cartItems)

          this.getTotal();
        });
      },
      error: (error) => {
        console.log('from itemPlus', error);
      },
    });
  }
  getTotal() {
    if (this.cartItems) {
      let total = 0;
      this.cartItems.forEach((item: CartItem) => {
        if (item.subtotal) {
          total = total + item.subtotal;
        }
        this.cartSubTotal = total;
     
      });

      const totalObj: { [key: string]: number } = {};
      for (const category of this.categoriesOfCartItems) {
        let totalPrice = 0;
        for (const product of this.productsByCategory[category]) {
          totalPrice += product.subtotal;
        }
        totalObj[category] = totalPrice;
        this.categoryWiseTotal = totalObj;
      }
      this.cartService.cartSubTotal.next(this.cartSubTotal);
    }
  }

  checkout() {
    if (this.cartItems.length > 0) {
      if(localStorage.getItem('token')){
        console.log(this.cartItems);
        this.router.navigate(['cart/myCart/checkout']);
      }
      else{
        this.router.navigate(['login'])
      }
    } else {
      alert('empty cart');
    }
  }
}
