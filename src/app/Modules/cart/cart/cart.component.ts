import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grocery } from 'src/app/Shared/Interfaces/groceryInterface';
import { ApiService } from 'src/app/Shared/Services/api/api.service';
import { CartService } from 'src/app/Shared/Services/cart/cart.service';
import { CartItem } from '../../../Shared/Interfaces/cartItem';
import { HttpClient } from '@angular/common/http';
import { isEmpty } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
// import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: []
})
export class CartComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private api: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getCartProducts()
    this.getTotal();


    // let userMatchedCart = cart.filter((res: any) => res.userId == this.api.userId)
    // this.cartId = userMatchedCart[0]?.id
    // if (this.cartId) {

    // this.cartItems = JSON.parse(localStorage.getItem('cartItems'))
    this.getTotal()
    // if (!this.api.userId) {
    //   this.cartService.logoutCart.subscribe((res) => {
    //     this.cartItems = res;
    //     console.log(this.cartItems, "logout")
    //     if (this.cartItems.length == 0) {
    //       this.isEmpty = true
    //       console.log("hi", this.isEmpty)
    //     }
    //   })
    // }
    // console.log(this.cartItems, "this.cartItems")
    // console.log(this.cartItems.length, "this.cartItems")
    // if (this.cartItems.length == 0) {
    //   this.isEmpty = true
    //   console.log("hi", this.isEmpty)
    // }

    // }

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
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
    let userName = JSON.parse(localStorage.getItem('userName'))

    this.cartService.Quantity_Plus(userName, product)
    this.cartSubTotal = this.cartService.Get_Total(userName)
    this.getCartProducts()
    // let defaultCart =JSON.parse(localStorage.getItem('cartItems'))
    // this.cartItems = JSON.parse(localStorage.getItem('cartItems'))
    // let duplicateProduct = this.cartItems.find((res: any) => res.id == product.id)
    // duplicateProduct.quantityCount++
    // duplicateProduct.subtotal = duplicateProduct.quantityCount * duplicateProduct.amount
    // let index = this.cartItems.findIndex((obj: any) => obj.id == product.id)
    // this.cartItems[index] = product
    // defaultCart.cart = this.cartItems
    // this.getTotal()
    // if (duplicateProduct) {
    //   // console.log("existingProducts", this.cartItems)
    //   localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    //   this.getTotal()

  }

  // product.quantityCount++;
  // product.subtotal = product.quantityCount * product.amount;


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
    let userName = JSON.parse(localStorage.getItem('userName')) 
    this.cartService.Quantity_Minus(userName, product)
    this.cartSubTotal = this.cartService.Get_Total(userName)
    this.getCartProducts()

    // let defaultCart =JSON.parse(localStorage.getItem('cartItems'))
    // this.cartItems = JSON.parse(localStorage.getItem('cartItems'))
    // let duplicateProduct = this.cartItems.find((res: any) => res.id == product.id)
    // if (duplicateProduct.quantityCount > 1) {
    //   duplicateProduct.quantityCount--
    //   duplicateProduct.subtotal = duplicateProduct.quantityCount * duplicateProduct.amount

    // }
    // // let index = this.cartItems.findIndex((obj: any) => obj.id == product.id)
    // // this.cartItems[index] = product
    // // defaultCart.cart = this.cartItems
    // this.getTotal()
    // if (duplicateProduct) {
    //   // console.log("existingProducts", this.cartItems)
    //   localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    // }

  }
  cancel(product: any) {
    let userName = JSON.parse(localStorage.getItem('userName'))

    this.cartService.Delete_Cart_LocalStorage(userName, product)
    this.cartSubTotal = this.cartService.Get_Total(userName)
    this.getCartProducts()

    // console.log("thiscatyitem", this.cartItems)
    // let index = this.cartItems.findIndex((res: any) => res.id === product.id)
    // // console.log(index, "index")
    // this.cartItems.splice(index, 1);
    // localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    // let userWiseCart = JSON.parse(localStorage.getItem('userWiseCart'))
    // let userName = JSON.parse(localStorage.getItem('userName'))
    // let user = userWiseCart.find((user) => user.userName === userName)
    // let userIndex = userWiseCart.findIndex((user) => user.userName === userName)
    // console.log(userIndex)
    // console.log(userWiseCart[userIndex].userCart)
    // userWiseCart[userIndex].userCart = this.cartItems
    // console.log(userWiseCart, "usewedsibfsadbjsdc")
    // localStorage.setItem('userWiseCart', JSON.stringify(userWiseCart))



    // this.cartService.cartDataSubject.next(this.cartItems);
    // this.getTotal()

  }

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

  getTotal() {
    if (this.cartItems) {
      console.log("cart componetn ttal")
    let userName = JSON.parse(localStorage.getItem('userName'))
      this.cartSubTotal = this.cartService.Get_Total(userName)
     
      }

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
  getCartProducts() {
    let cart = JSON.parse(localStorage.getItem('Cart'))
    let username = JSON.parse(localStorage.getItem('userName'))
    let userCart = cart.find((user: any) => user.username == username);
    console.log(cart, "carrt")
    console.log(userCart, "usercart")
    if(userCart){
      this.cartItems = userCart.items
    }

   
  }

  // getCartData() {
  //   let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
  //   let userWiseCart = JSON.parse(localStorage.getItem('userWiseCart')) || []

  //   console.log('userWiseCart:', userWiseCart) // Debugging line

  //   if (userWiseCart) {
  //     let userName = JSON.parse(localStorage.getItem('userName'))

  //     console.log('userName:', userName) // Debugging line

  //     if (userName) {
  //       // Find the user's cart
  //       let user = userWiseCart.find((user) => user.userName === userName)

  //       if (user) {
  //         // Merge the user's cart with any existing items in the cart
  //         let temp = []
  //         user.userCart.forEach((product: any) => {
  //           temp.push(product)
  //         })

  //         if (cartItems.length > 0) {
  //           cartItems.forEach((item: any) => {
  //             // Only add the item if it isn't already in the user's cart
  //             if (!temp.some((product: any) => product.id === item.id)) {
  //               temp.push(item)
  //             }
  //           })
  //         }

  //         this.cartItems = temp
  //       } else {
  //         // Use the existing cart items if the user's cart isn't found
  //         this.cartItems = cartItems
  //       }
  //     } else {
  //       // Use the existing cart items if the user is not logged in
  //       this.cartItems = cartItems
  //     }
  //   } else {
  //     // Use the existing cart items if userWiseCart is not present in local storage
  //     this.cartItems = cartItems
  //   }
  // }

}
