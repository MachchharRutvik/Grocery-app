import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grocery } from 'src/app/Shared/Interfaces/groceryInterface';
import { ApiService } from 'src/app/Shared/Services/api/api.service';
import { CartService } from 'src/app/Shared/Services/cart/cart.service';
import { CartItem } from '../../../Shared/Interfaces/cartItem';
import { HttpClient } from '@angular/common/http';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.api.getCartData().subscribe((res: any) => {
      let cart: any = res
      let userMatchedCart = cart.filter((res: any) => res.userId == this.api.userId)
      this.cartId = userMatchedCart[0]?.id
      if (this.cartId) {
        this.http.get('http://localhost:3000/cart/' + this.cartId).subscribe((res: any) => {
          this.cartItems = res.cart
          console.log(res)
          this.getTotal()
          if (!this.api.userId) {
            this.cartService.logoutCart.subscribe((res) => {
              this.cartItems = res;
              console.log(this.cartItems, "logout")
              if (this.cartItems.length == 0) {
                this.isEmpty = true
                console.log("hi", this.isEmpty)
              }
            })
          }
          console.log(this.cartItems, "this.cartItems")
          console.log(this.cartItems.length, "this.cartItems")
          if (this.cartItems.length == 0) {
            this.isEmpty = true
            console.log("hi", this.isEmpty)
          }
        })

      }

      // this.cartItems = res;
      // console.log(this.cartItems, 'thiscartitems');
      // console.log('hello', this.cartSubTotal);
      // this.categoriesOfCartItems = this.getCategoryByProducts();
      // console.log('getCategoryByProducts', this.categoriesOfCartItems);
      // this.productsByCategory = this.getProductsByCategory();
      // console.log('getProductsByCategory', this.productsByCategory);
      // this.getTotal();
    });

  }
  isEmpty = false
  cartId: any
  categoriesOfCartItems: string[] = [];
  productsByCategory: any;
  cartItems: any = [];
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
    console.log('getcategory', this.cartItems);
    let category = this.cartItems.map(
      (product: { category: string }) => product.category
    );

    return Array.from(new Set(category));
  }
  itemPlus(product: any) {
    this.http.get('http://localhost:3000/cart/' + this.cartId).subscribe((res: any) => {
      let defaultCart = res
      this.cartItems = res.cart
      product.quantityCount++
      product.subtotal = product.quantityCount * product.amount
      let index = this.cartItems.findIndex((obj: any) => obj.id == product.id)
      this.cartItems[index] = product
      defaultCart.cart = this.cartItems
      this.getTotal()
      this.http.put('http://localhost:3000/cart/' + this.cartId, defaultCart).subscribe(res => console.log("res", res), (err) => console.log(err))
    })
    // product.quantityCount++;
    // product.subtotal = product.quantityCount * product.amount;
  }

  //   this.api.updateItem(product).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.api.getCartData().subscribe((res) => {
  //         this.cartItems = res;
  //         // console.log('cartItems', this.cartItems);
  //         this.getTotal();
  //       });
  //     },
  //     error: (error) => {
  //       console.log('from itemPlus', error);
  //     },
  //   });
  // }
  itemMinus(product: any) {
    this.http.get('http://localhost:3000/cart/' + this.cartId).subscribe((res: any) => {
      let defaultCart = res
      this.cartItems = res.cart
      if (product.quantityCount > 1) {
        product.quantityCount--
        product.subtotal = product.quantityCount * product.amount
        let index = this.cartItems.findIndex((obj: any) => obj.id == product.id)
        this.cartItems[index] = product
        defaultCart.cart = this.cartItems
        this.getTotal()
        this.http.put('http://localhost:3000/cart/' + this.cartId, defaultCart).subscribe(res => console.log("res", res), (err) => console.log(err))
      }
    })
    // if (product.quantityCount > 1) {
    //   product.quantityCount--;
    //   product.subtotal = product.quantityCount * product.amount;
    // }
    // if (product.quantityCount == 0) {
    //   this.api.deleteProduct(product).subscribe((res) => {
    //     console.log(res);
    //     this.api.getCartData().subscribe(
    //       (res) => {
    //         this.cartItems = res;
    //         this.categoriesOfCartItems = this.getCategoryByProducts();
    //         // console.log('getCategoryByProducts', this.categoriesOfCartItems);
    //         this.productsByCategory = this.getProductsByCategory();
    //         // console.log('getProductsByCategory', this.productsByCategory);
    //         // console.log('cartItems', this.cartItems);

    //         this.getTotal();
    //       },
    //       (err) => {
    //         console.log(err);
    //       }
    //     );
    //   });
    //   return;
    // }

    // this.api.updateItem(product).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.api.getCartData().subscribe((res) => {
    //       this.cartItems = res;
    //       // console.log('cartItems', this.cartItems);
    //       this.getTotal();
    //     });
    //   },
    //   error: (error) => {
    //     console.log('from itemMinus', error);
    //   },
    // });
    // return;
  }
  cancel(product: any) {
    this.http.get('http://localhost:3000/cart/' + this.cartId).subscribe((res: any) => {
      let defaultCart = res
      this.cartItems = res.cart
      let index = this.cartItems.findIndex((obj: any) => obj.id == product.id)
      this.cartItems.splice(index, 1)
      console.log(this.cartItems, "thiscartitmes")
      defaultCart.cart = this.cartItems
      this.getTotal()
      this.cartService.cartDataSubject.next(this.cartItems)
      console.log(defaultCart, "defaultcart");
      this.http.put('http://localhost:3000/cart/' + this.cartId, defaultCart).subscribe(res => {
        this.getTotal()
        console.log("res", res)
      },
        (err) => console.log(err))

    })
    // this.api.deleteProduct(product).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.api.getCartData().subscribe((res) => {
    //       this.cartItems = res;
    //       this.getTotal();
    //       this.categoriesOfCartItems = this.getCategoryByProducts();
    //       // console.log('getCategoryByProducts', this.categoriesOfCartItems);
    //       this.productsByCategory = this.getProductsByCategory();
    //       // console.log('getProductsByCategory', this.productsByCategory);
    //       // console.log('cartItems', );

    //       this.cartService.cartDataSubject.next(this.cartItems);
    //     });
    //   },
    //   error: (error) => {
    //     console.log('from itemPlus', error);
    //   },
    // });
  }
  getTotal() {
    if (this.cartItems) {
      let total = 0;
      this.cartItems.forEach((item: CartItem) => {
        if (item.subtotal) {
          total = total + item.subtotal;
        }
        this.cartSubTotal = total;
        this.cartService.cartSubTotal.next(this.cartSubTotal)
      });

      // const totalObj: { [key: string]: number } = {};
      // for (const category of this.categoriesOfCartItems) {
      //   let totalPrice = 0;
      //   for (const product of this.productsByCategory[category]) {
      //     totalPrice += product.subtotal;
      //   }
      //   totalObj[category] = totalPrice;
      //   this.categoryWiseTotal = totalObj;
      // }
      // // this.cartService.getTotal();
      // console.log('cartSubTital', this.cartSubTotal);

      // this.cartService.cartSubTotal.next(this.cartSubTotal);
    } else {
      console.log('emptycart');
    }
  }

  checkout() {
    if (this.cartItems.length > 0) {
      if (localStorage.getItem('token')) {
        console.log(this.cartItems);
        this.router.navigate(['cart/myCart/checkout']);
      } else {
        this.router.navigate(['login']);
      }
    } else {
      alert('empty cart');
    }
  }
}
