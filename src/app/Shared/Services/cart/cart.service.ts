import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../../Interfaces/cartItem';
import { ApiService } from '../api/api.service';
import { ProductsService } from '../products/products.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartItem[] = [];
  cartDataSubject = new BehaviorSubject<any>(this.cart);
  cartDataSubject$ = this.cartDataSubject.asObservable();
  cartSubTotal = new BehaviorSubject<number>(0);
  baseUrl = environment.baseURL;
  itemCount = new Subject<number>();
  count = new BehaviorSubject<number>(0);
  logoutCart = new BehaviorSubject<any[]>([])
  cartTotal:any

  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private api: ApiService,
  ) {
    // this.api.getCartData().subscribe((res) => {
    //   this.cart = res;
    //   this.cartItems = res;
    // });
  }
  ngOnInIt() {
    this.http.get('http://localhost:3000/cart/').subscribe((res) => {
      let cart: any = res;
      let userMatchedCart = cart.filter((res: any) => res.userId == this.api.userId);
      // let cartId = userMatchedCart[0].id;
      let cartArray = userMatchedCart[0].cart
      this.cart = cartArray
      console.log(this.cart,"ngthiscart")
      this.cartDataSubject.next(this.cart)
      
      // this.cartSubTotal.next()
    })
    // this.api.getCartData().subscribe((res) => {
    //   this.cart = res;
    // });
  }

  getCartProduct(product: any): CartItem {
    const cartProduct = product;
    const cartProducts: CartItem = {
      id: cartProduct.id,
      userId : this.api.userId,
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
  addToCart(product: any) {
    console.log("product",product)
    this.http.get('http://localhost:3000/cart/').subscribe((res) => {
      let cart: any = res;
      let userMatchedCart = cart.filter((res: any) => res.userId == this.api.userId);
      let cartId = userMatchedCart[0].id;
      let cartArray = userMatchedCart[0].cart;
      let existingProductIndex = cartArray.findIndex((item: any) => item.id === product.id);
      if (existingProductIndex !== -1) {
        cartArray[existingProductIndex].quantityCount += 1;
        cartArray[existingProductIndex].subtotal += product.amount;
      } else {
        const cartProduct = {
          id: product.id,
          title: product.title,
          amount: product.amount,
          quantityCount: 1,
          subtotal: product.amount,
        };
        cartArray.push(cartProduct);
      }
      let userCart = {
        userId: this.api.userId,
        cart: cartArray,
      };
      this.cartDataSubject.next(cartArray)
      this.http.put('http://localhost:3000/cart/' + cartId, userCart).subscribe(
        (res) => {
          
          console.log(res, 'cart data updated')
        },
        (err) => console.log(err, 'cart data error')
      );
    });
  }
 
  getCartItems() {
    this.api.getCartData().subscribe((res) => {
      this.cart = res;
      this.cartDataSubject.next(this.cart);
    });
    // return this.cartDataSubject.asObservable();
  }
  cartItems: any;
  // categoriesOfCartItems: any;
  // productsByCategory: any;
  // categoryWiseTotal: any;
  // getProductsByCategory() {
  //   let products = this.cartItems.reduce(
  //     (result: any, product: { category: string | number; discPrice: any }) => {
  //       (result[product.category] = result[product.category] || []).push(
  //         product
  //       );
  //       result[product.category].totalPrice =
  //         (result[product.category].totalPrice || 0) + product.discPrice;
  //       return result;
  //     },
  //     {}
  //   );
  //   return products;
  // }
  // getCategoryByProducts(): string[] {
  //       let category = this.cartItems.map(
  //     (product: { category: string }) => product.category
  //   );

  //   return Array.from(new Set(category));
  // }
  // getTotal() {
  //   this.api.getCartData().subscribe((res) => {
  //     console.log(res);
  //     // this.categoriesOfCartItems = this.getCategoryByProducts();
  //     // this.productsByCategory = this.getProductsByCategory();
  //     this.cartItems = res;
  //     if (this.cartItems) {
  //       let total = 0;
  //       this.cartItems.forEach((item: CartItem) => {
  //         if (item.subtotal) {
  //           total = total + item.subtotal;
  //         }
  //         this.cartTotal = total;
  //       });

  //       // const totalObj: { [key: string]: number } = {};
  //       // for (const category of this.categoriesOfCartItems) {
  //       //   let totalPrice = 0;
  //       //   for (const product of this.productsByCategory[category]) {
  //       //     totalPrice += product.subtotal;
  //       //   }
  //       //   totalObj[category] = totalPrice;
  //       //   this.categoryWiseTotal = totalObj;
  //       // }
  //       this.cartSubTotal.next(this.cartTotal);
  //     }
  //   });
  //   return this.cartTotal
  // }
  
getCartTotal(){
  let total = 0;
  this.http.get('http://localhost:3000/cart/').subscribe((res) => {
      let cart: any = res;
      let userMatchedCart = cart.filter((res: any) => res.userId == this.api.userId);
      // let cartId = userMatchedCart[0].id;
      let cartArray = userMatchedCart[0].cart
      cartArray.forEach((item:any) => {
        if (item.subtotal) {
          total = total + item.subtotal;
        }
        this.cartTotal = total;
        this.cartSubTotal.next(this.cartTotal)
      });
      console.log("thiscarttota;",this.cartTotal)
    })
    return this.cartTotal
}
 emptyCart(){
  this.http.get('http://localhost:3000/cart/').subscribe((res) => {
    let cart: any = res;
    let userMatchedCart = cart.filter((res: any) => res.userId == this.api.userId);
    let cartId = userMatchedCart[0].id;
    let userCart = {
      userId: this.api.userId,
      cart:[]
    };
    this.cartDataSubject.next([])
    let total = this.getCartTotal()
    this.http.put('http://localhost:3000/cart/' + cartId, userCart).subscribe(
      (res) => console.log(res, 'cart data updated'),
      (err) => console.log(err, 'cart data error')
    );
 })
}
}
