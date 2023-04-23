import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
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
  userLoggedIn = new BehaviorSubject<boolean>(false)
  baseUrl = environment.baseURL;
  // itemCount = new Subject<number>();
  itemCount = new BehaviorSubject<number>(0);
  logoutCart = new BehaviorSubject<any[]>([])
  cartTotal: any
  headerItemsCount:any
  headerItemsTotal:any

  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private api: ApiService,
  ) {
    console.log(this.headerItemsTotal,"this.headerItemstotla from cartService")
    let username = localStorage.getItem('userName')
    this.Get_Total(username)
    // this.itemCount.next(this.headerItemsCount)
    
    // this.api.getCartData().subscribe((res) => {
    //   this.cart = res;
    //   this.cartItems = res;
    // });
  }
  ngOnInIt() {
    // this.http.get('http://localhost:3000/cart/').subscribe((res) => {
    //   let cart: any = res;
    //   let userMatchedCart = cart.filter((res: any) => res.userId == this.api.userId);
    // let cartId = userMatchedCart[0].id;
    // let cartArray = userMatchedCart[0].cart
    // this.cart = cartArray
    // console.log(this.cart, "ngthiscart")
    // this.cartDataSubject.next(this.cart)

    // this.cartSubTotal.next()
    // })
    // this.api.getCartData().subscribe((res) => {
    //   this.cart = res;
    // });
  }
  countCartItems(){

  }

  // getCartProduct(product: any): CartItem {
  //   const cartProduct = product;
  //   const cartProducts: CartItem = {
  //     id: cartProduct.id,
  //     userId: this.api.userId,
  //     grocery_name: cartProduct.grocery_name,
  //     price: cartProduct.price,
  //     shop: cartProduct.store,
  //     discPrice: cartProduct.discountPrice,
  //     quantity: 1,
  //     quantityCount: 1,
  //     category: cartProduct.category,
  //     subtotal: cartProduct.discountPrice,
  //     imageUrl: cartProduct.imageUrl,
  //   };
  //   return cartProducts;
  // }
  // addToCart(product: any) {
  //   console.log("product",product)
  //   this.http.get('http://localhost:3000/cart/').subscribe((res) => {
  //     let cart: any = res;
  //     let userMatchedCart = cart.filter((res: any) => res.userId == this.api.userId);
  //     let cartId = userMatchedCart[0].id;
  //     let cartArray = userMatchedCart[0].cart;
  //     let existingProductIndex = cartArray.findIndex((item: any) => item.id === product.id);
  //     if (existingProductIndex !== -1) {
  //       cartArray[existingProductIndex].quantityCount += 1;
  //       cartArray[existingProductIndex].subtotal += product.amount;
  //     } else {
  //       const cartProduct = {
  //         id: product.id,
  //         title: product.title,
  //         amount: product.amount,
  //         quantityCount: 1,
  //         subtotal: product.amount,
  //       };
  //       cartArray.push(cartProduct);
  //     }
  //     let userCart = {
  //       userId: this.api.userId,
  //       cart: cartArray,
  //     };
  //     this.cartDataSubject.next(cartArray)
  //     this.http.put('http://localhost:3000/cart/' + cartId, userCart).subscribe(
  //       (res) => {

  //         console.log(res, 'cart data updated')
  //       },
  //       (err) => console.log(err, 'cart data error')
  //     );
  //   });
  // }
  // addToCart(product: any) {
  //   // Retrieve existing cart items from local storage
  //   let existingProducts:any = JSON.parse(localStorage.getItem('cartItems')) || [];

  //   // Check if the product already exists in the cart
  //   let duplicateProduct = existingProducts.find((res:any)=>res.id ==product.id);
  //   console.log(duplicateProduct,"duplicateproduct")

  //   if(duplicateProduct){
  //     // If the product already exists, update its quantity and subtotal
  //     duplicateProduct.quantityCount++;
  //     duplicateProduct.subtotal = duplicateProduct.quantityCount * duplicateProduct.amount;
  //   } else {
  //     // If the product does not exist, add it to the cart
  //     const cartProduct = {
  //       id: product.id,
  //       title: product.title,
  //       amount: product.amount,
  //       quantityCount: 1,
  //       subtotal: product.amount,
  //     };
  //     existingProducts.push(cartProduct);
  //   }

  //   // Store the updated cart items array back into local storage
  //   localStorage.setItem("cartItems",JSON.stringify(existingProducts));
  //    let userName = JSON.parse(localStorage.getItem('userName'))
  //    if(userName){
  //     let userWiseCart = {
  //       userName:userName,
  //       userCart:existingProducts
  //     }
  //     localStorage.setItem("userWiseCart",JSON.stringify(userWiseCart))
  //    }
  // }

  // getCartItems() {
  //   this.api.getCartData().subscribe((res) => {
  //     this.cart = res;
  //     this.cartDataSubject.next(this.cart);
  //   });
  // return this.cartDataSubject.asObservable();
  // }

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

  // getCartTotal() {
  //   let total = 0;
  //   this.http.get('http://localhost:3000/cart/').subscribe((res) => {
  //     let cart: any = res;
  //     let userMatchedCart = cart.filter((res: any) => res.userId == this.api.userId);
  //     // let cartId = userMatchedCart[0].id;
  //     if( userMatchedCart.length>0){
  //       let cartArray = userMatchedCart[0].cart
  //       cartArray.forEach((item: any) => {
  //         if (item.subtotal) {
  //           total = total + item.subtotal;
  //         }
  //         this.cartTotal = total;
  //         this.cartSubTotal.next(this.cartTotal)
  //       });
  //       console.log("thiscarttota;", this.cartTotal)
  //     }
  //     })
  //     return this.cartTotal
  // }
  // emptyCart() {
  //   this.http.get('http://localhost:3000/cart/').subscribe((res) => {
  //     let cart: any = res;
  //     let userMatchedCart = cart.filter((res: any) => res.userId == this.api.userId);
  //     let cartId = userMatchedCart[0].id;
  //     let userCart = {
  //       userId: this.api.userId,
  //       cart: []
  //     };
  //     this.cartDataSubject.next([])
  //     let total = this.getCartTotal()
  //     this.http.put('http://localhost:3000/cart/' + cartId, userCart).subscribe(
  //       (res) => console.log(res, 'cart data updated'),
  //       (err) => console.log(err, 'cart data error')
  //     );
  //   })
  // }

  //dutt code
  User_Add_Cart(username: any) {
    let cart_Arr: any = [];
    if (localStorage.getItem('Cart')) {
      let Merge = JSON.parse(localStorage.getItem('Cart'));
      cart_Arr = Merge.find((user: any) => user.username == username);
      console.log('Cart_Arr', cart_Arr);
      let cart = {
        username: username,
        items: [],
      };
      if (!cart_Arr) {
        console.log('username', username);
        console.log('cart', cart);
        let Arr = JSON.stringify([]);
        if (!localStorage.getItem('Cart')) {
          localStorage.setItem('Cart', Arr);
        }

        let Merge = JSON.parse(localStorage.getItem('Cart'));
        Merge.push(cart);
        console.log('Merge', Merge);
        localStorage.setItem('Cart', JSON.stringify(Merge));
        // localStorage.setItem("Cart",JSON.stringify(cart))
      }
    } else {
      let cart = {
        username: username,
        items: [],
      };
      if (!cart_Arr.length) {
        console.log('username', username);
        console.log('cart', cart);
        let Arr = JSON.stringify([]);
        if (!localStorage.getItem('Cart')) {
          localStorage.setItem('Cart', Arr);
        }

        let Merge = JSON.parse(localStorage.getItem('Cart'));
        Merge.push(cart);
        console.log('Merge', Merge);
        localStorage.setItem('Cart', JSON.stringify(Merge));

        // localStorage.setItem("Cart",JSON.stringify(cart))
      }
    }
  }
  ADD_Cart_User_Wise(username: any, data: any, id: any) {
    // let Product_Quantity={
    //   qunatity:quantity
    // }
    let Guest_cart = JSON.parse(sessionStorage.getItem('Guest_Cart'));
    if (!Guest_cart) {
      let Merge = JSON.parse(localStorage.getItem('Cart'));
      let cart = Merge.find((user: any) => user.username == username);
      let duplicate = cart.items.find((Duplicate: any) => Duplicate.id == id);
      data.quantityCount = 1;
      data.subTotal = data.amount * data.quantityCount
      if (!duplicate) {
        cart.items.push(data);
        console.log('Cart in Service==>>', cart);
        console.log('Merge', Merge);
       

        localStorage.setItem('Cart', JSON.stringify(Merge));
        this.headerItemsCount = cart.items.length
        this.itemCount.next(this.headerItemsCount)
        // this.toastr.success('Added to cart', data.title);
      } else {
        duplicate.quantityCount = duplicate.quantityCount + 1
        duplicate.subTotal = duplicate.amount * duplicate.quantityCount
        console.log('Merge', Merge);
       
        localStorage.setItem('Cart', JSON.stringify(Merge));
        console.log("CartRUtvik",cart)
        this.headerItemsCount = cart.items.length
        this.itemCount.next(this.headerItemsCount)
        // this.toastr.info('Already Added Please Go to Cart', data.title);
        localStorage.setItem('Cart', JSON.stringify(Merge));
      }
    } else {
      let Merge = JSON.parse(localStorage.getItem('Cart'));
      let cart = Merge.find((user: any) => user.username == username);
      let duplicate = cart.items.find((Duplicate: any) => Duplicate.id == id);
      if (!duplicate) {
        cart.items.push(data);
        if (Guest_cart[0].items.length) {

          cart.items.push(Guest_cart[0].items[0]);
          if (Guest_cart) {
            let Merge = JSON.parse(localStorage.getItem('Guest_Cart'));
            if (Merge) {
              Merge[0].items = [];
              console.log("Merge", Merge)
              localStorage.setItem('Cart', JSON.stringify(Merge));
        this.headerItemsCount = cart.items.length
        console.log("this.headerITemsCOunt",this.headerItemsCount)
        this.itemCount.next(this.headerItemsCount)

              localStorage.setItem('Guest_Cart', JSON.stringify(Merge));
            }
          }
        }
        console.log('Cart in Service==>>', cart);
        console.log('Merge', Merge);
        localStorage.setItem('Cart', JSON.stringify(Merge));
        this.headerItemsCount = cart.items.length
        this.itemCount.next(this.headerItemsCount)

        localStorage.setItem('Cart', JSON.stringify(Merge));


        //  this.toastr.success('Added to cart', data.title);
      } else {
        // duplicate.quantity=duplicate.quantity+1
        console.log('Merge', Merge);
       

        //    this.toastr.info('Already Added Please Go to Cart', data.title);
        localStorage.setItem('Cart', JSON.stringify(Merge));


      }
    }
  }

  ADD_Cart_User_Wise_Quantity(username: any, data: any, id: any) {
    // let Product_Quantity={
    //   qunatity:quantity
    // }

    let Merge = JSON.parse(localStorage.getItem('Cart'));
    let cart = Merge.find((user: any) => user.username == username);
    let duplicate = cart.items.find((Duplicate: any) => Duplicate.id == id);
    if (!duplicate) {
      cart.items.push(data);
      console.log('Cart in Service==>>', cart);
      console.log('Merge', Merge);
      localStorage.setItem('Cart', JSON.stringify(Merge));
        this.headerItemsCount = cart.items.length
        this.itemCount.next(this.headerItemsCount)

      localStorage.setItem('Cart', JSON.stringify(Merge));
      // this.toastr.success('Added to cart', data.title);
    } else {
      duplicate.quantity = duplicate.quantity + 1;
      console.log('Merge', Merge);
      localStorage.setItem('Cart', JSON.stringify(Merge));
        this.headerItemsCount = cart.items.length
        this.itemCount.next(this.headerItemsCount)

      localStorage.setItem('Cart', JSON.stringify(Merge));
      //  this.toastr.info('Already Added Please Go to Cart', data.title);
    }


  }
  Quantity_Plus(username: any, data: any) {
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    let cart = Merge.find((user: any) => user.username == username);
    let duplicate = cart.items.find(
      (Duplicate: any) => Duplicate.id == data.id
    );
    if (duplicate) {
      duplicate.quantityCount = duplicate.quantityCount + 1
      duplicate.subTotal = duplicate.quantityCount * duplicate.amount
      console.log('Merge', Merge);
      // this.toastr.info('Already Added Please Go to Cart', data.title);
     

      localStorage.setItem('Cart', JSON.stringify(Merge));
    }


  }
  Quantity_Minus(username: any, data: any) {
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    console.log('Merge');

    let cart = Merge.find((user: any) => user.username == username);
    let duplicate = cart.items.find(
      (Duplicate: any) => Duplicate.id == data.id
    );
    if (duplicate.quantityCount > 1) {
      duplicate.quantityCount = duplicate.quantityCount - 1;
      duplicate.subTotal = duplicate.quantityCount * duplicate.amount
      console.log('Merge', Merge);
      // this.toastr.info('Already Added Please Go to Cart', data.title);
      localStorage.setItem('Cart', JSON.stringify(Merge));

    }


  }
  Delete_Cart_LocalStorage(username: any, data: any) {
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    let cart = Merge.find((user: any) => user.username == username);
    let duplicate = cart.items.find(
      (Duplicate: any) => Duplicate.id == data.id
    );
    console.log("duplicate from delete",duplicate)
    let Index = cart.items.indexOf(duplicate);
    console.log("Index from delete",Index)
    console.log('cart indexOf', cart.items.indexOf(duplicate));
    // console.log('cart.items.splice(Index,1)', cart.items.splice(Index, 1));
    cart.items.splice(Index, 1);
    // this.headerItemsCount = cart.items.length
    // this.itemCount.next(this.headerItemsCount)
    this.Get_Total(username)

    localStorage.setItem('Cart', JSON.stringify(Merge));

  }
  Delete_User_Cart_LocalStorage(username: any) {
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    let cart = Merge.find((user: any) => user.username == username);
    cart.items = [];
    console.log('cart.items', cart.items);
    console.log('Merge', Merge);
    localStorage.setItem('Cart', JSON.stringify(Merge));
    this.Get_Total(username)
    // this.Get_Total(username)
    // this.getItemCount()
    //   this.Subtotal()
  }
  Guest_cart_Generate() {
    if (!sessionStorage.getItem('Guest_Cart')) {
      let cart = {
        items: [],
      };

      console.log('cart', cart);
      let Arr = JSON.stringify([]);
      if (!sessionStorage.getItem('Guest_Cart')) {
        sessionStorage.setItem('Guest_Cart', Arr);
      }
      let Merge = JSON.parse(sessionStorage.getItem('Guest_Cart'));
      Merge.push(cart);
      console.log('Merge', Merge);
      sessionStorage.setItem('Guest_Cart', JSON.stringify(Merge));
    }
  }
  Guest_User(data: any) {
    if (sessionStorage.getItem('Guest_Cart')) {
      let Merge = JSON.parse(sessionStorage.getItem('Guest_Cart'));
      if (Merge[0].items.length == 0) {
        let duplicate = Merge[0].items.find(
          (Duplicate: any) => Duplicate.id == data.id
        );
        if (!duplicate) {
          Merge[0].items.push(data);
          console.log('Cart in Service==>>', Merge);
          sessionStorage.setItem('Guest_Cart', JSON.stringify(Merge));
          // this.toastr.success('Added to cart', data.title);
        } else {
          // duplicate.quantity=duplicate.quantity+1
          console.log('Merge', Merge);
          // this.toastr.info('Already Added Please Go to Cart', data.title);
          sessionStorage.setItem('Guest_Cart', JSON.stringify(Merge));
        }
      } else {
        //this.toastr.error('Please Login For Add More Items in Cart');
      }
    }
  }
  Delete_Guest_cart() {
    let Merge = JSON.parse(sessionStorage.getItem('Guest_Cart'));
    if (Merge) {
      Merge[0].items = [];
      sessionStorage.setItem('Guest_Cart', JSON.stringify(Merge));
    }
  }
  Get_Total(username) {
    let grand_total = 0
    let Merge = JSON.parse(localStorage.getItem('Cart'));
    console.log("merger",Merge)
    if(Merge && Merge.length>0){
      let cart = Merge.find((user: any) => user.username == username);
      console.log("total", cart)
      if (cart && cart.items.length>0) {
        
        console.log("total in cart", cart)
        cart.items.map((item) => {
          grand_total = grand_total + item.subTotal
          console.log("total in cart grand", grand_total)
          this.headerItemsTotal = grand_total
        })
        let itemCount = cart.items.length
        this.headerItemsCount = itemCount
        this.itemCount.next(this.headerItemsCount)
      this.cartSubTotal.next(this.headerItemsTotal)
      }
      else{
        this.headerItemsTotal = 0
        this.headerItemsCount =0
        this.itemCount.next(this.headerItemsCount)
      this.cartSubTotal.next(this.headerItemsTotal)
      }
      
      console.log(this.headerItemsTotal,"this.headersIrtemcount")
    }
    return grand_total
  }

}
