import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../../Interfaces/cartItem';
import { ApiService } from '../api/api.service';
import { ProductsService } from '../products/products.service';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartItem[] = [];
  cartDataSubject = new BehaviorSubject<CartItem[]>(this.cart);
  cartDataSubject$ = this.cartDataSubject.asObservable();
  cartSubTotal = new BehaviorSubject<number>(0);
  baseUrl = environment.baseURL;
  itemCount = new Subject<number>();
  count = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private api: ApiService
  ) {
    this.api.getCartData().subscribe((res) => {
      this.cart = res;
    });
  }
  ngOnInIt() {
    this.api.getCartData().subscribe((res) => {
      this.cart = res;
    });
  }

  getCartProduct(product: any): CartItem {
    const cartProduct = product;
    const cartProducts: CartItem = {
      id: cartProduct.id,
      grocery_name: cartProduct.grocery_name,
      price: cartProduct.price,
      shop: cartProduct.store,
      discPrice: cartProduct.discountPrice,
      quantity: 1,
      quantityCount: 1,
      category: cartProduct.category,
      subtotal: cartProduct.discountPrice,
      imageUrl: cartProduct.imageUrl,
    };
    return cartProducts;
  }
  addToCart(product: CartItem) {
    let cartProduct: CartItem = this.getCartProduct(product);
    console.log('cartproduct', cartProduct);
    this.api.addToCartApi(cartProduct).subscribe((res) => {
      console.log('addtocartr', res);
      console.log(this.cartDataSubject, 'cartdatasubject');
      this.api.getCartData().subscribe((res) => {
        this.cart = res;
        this.cartDataSubject.next(this.cart);
        console.log(this.cart, 'this caryt');
      });
    });
  }

  getCartItems() {
    this.api.getCartData().subscribe((res) => {
      this.cart = res;
      this.cartDataSubject.next(this.cart);
    });
    // return this.cartDataSubject.asObservable();
  }
}
