import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../../Interfaces/cartItem';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { cart } from '../../Interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  quantityCount: any;
  constructor(private route: Router, private http: HttpClient) {
    this.getUserDetails().subscribe((res) => {
      this.userId = res.data.id;
      console.log(this.userId,"usserID");
    });
  }
  ngOnInit(){
    this.getUserDetails().subscribe((res) => {
      this.userId = res.data.id;
      console.log(this.userId,"usserID");
    });
  }
  cart: { [key: string]: cart[] } = {}
userId:any
  baseURL = environment.baseURL;
  userDetailsURL = environment.userDetailsURL;
  changePasswordURL = environment.changePasswordURL;
  addAddressURL = environment.addAddressURL;
  updateUserDetailsURL = environment.updateUserDetail;
  categoriesURL = environment.categoriesURL;
  deleteAddressURL = environment.deleteAddressURL;
  encryptionURL = environment.encryptionURL;
  updateAddressURL = environment.updateAddressURL;
  productByCategoryIdURL = environment.productByCategoryIdURL;
  productByIdURL = environment.productByIdURL;
  addOrderURL = environment.addOrderURL;
  getOrdersURL = environment.getOrdersURL;
  getOrderDetailByIdURL = environment.getOrderDetailByIdURL;

  signUpApi(user: any) {
    let signUpURL = environment.registerURL;
    console.log('user', user);
    this.http.post(this.baseURL + signUpURL, user).subscribe(
      (data: any) => {
        localStorage.setItem('customerId', data.data.id);

        alert(data.message);
        this.route.navigate(['login']);
      },
      (error) => console.log(error)
    );
  }
  loginApi(user: any) {
    let loginURL = environment.loginURL;
    let userId: any;
    this.http.post(this.baseURL + loginURL, user).subscribe(

      (data: any) => {
        localStorage.setItem('token', data.data.token);
        this.getUserDetails().subscribe((res) => {
          console.log(res)
          userId = res.data.id
          let cart:any;
         this.http.get('http://localhost:3000/cart/').subscribe((res) => {
             cart = res
            console.log(res,"getcart");
            let hasUserId = cart.some((res:any)=>res.userId ==userId)
            console.log(hasUserId,"hasuserid")
            if(hasUserId){
              this.route.navigate(['']);
            }
            else{
              let userObj = {
                userId: userId,
                cart: []
              }
              this.addToCartApi(userObj).subscribe((res) => console.log(res), (err) => console.log(err))
            }
          }, (err) => console.log(err))
        })
        this.route.navigate(['home']);
      },
      (error) => alert(error.error.message)
    );
  }
  // { headers: new HttpHeaders({ 'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*' }
  getUserDetails() {
    return this.http.get<any>(this.baseURL + this.userDetailsURL, {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        'Access-Control-Allow-Origin': '*',
      }),
    });
  }

  // getUserDetails(){
  //   // const headers = {'Authorization': 'Bearer ' + token}
  //   return this.http.get("https://e099-117-217-127-105.in.ngrok.io/api/v1/customer/customer-details?=");
  // }
  addToCartApi(product: any) {
    return this.http.post('http://localhost:3000/cart', product);
  }
  getCartData() {
    return this.http.get<any>('http://localhost:3000/cart');
  }
  changePasswordApi(passwords: { oldPassword: any; newPassword: any }) {
    return this.http.put(this.baseURL + this.changePasswordURL, passwords);
  }
  updateUserDetails(userDetails: {
    first_name: any;
    last_name: any;
    password: any;
    date_of_birth: any;
    secondary_mobile_number: any;
    secondary_email: any;
  }) {
    return this.http.put(this.baseURL + this.updateUserDetailsURL, userDetails);
  }
  updateItem(item: CartItem) {
    try {
      return this.http.put<CartItem>(
        'http://localhost:3000/cart/' + item.id,
        item
      );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }
  deleteProduct(product: CartItem) {
    return this.http.delete<CartItem>(
      'http://localhost:3000/cart/' + product.id
    );
  }
  // emptyCart(cartItems:any){
  //   console.log("empty cart")
  //   const empty:any = []
  //  return this.http.put('http://localhost:3000/cart/',empty)
  // }
  addAddress(formValues: any) {
    return this.http.post(this.baseURL + this.addAddressURL, formValues);
  }
  deleteAddress(encryptedId: any) {
    return this.http.delete(this.baseURL + this.deleteAddressURL, {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        'Access-Control-Allow-Origin': '*',
        address_id: encryptedId,
      }),
    });
  }
  updateAddress(id: any, body: any) {
    let encryptedId;
    this.encryption(id).subscribe((res: any) => {
      encryptedId = res.data;
      console.log(encryptedId);
      const headers = new HttpHeaders({ address_id: encryptedId });
      this.http
        .put(this.baseURL + this.updateAddressURL, body, { headers })
        .subscribe(
          (res) => {
            console.log('response from update', res);
            this.route.navigate(['/user-profile/manage-addresses']);
          },
          (err) => {
            console.log('error from update', err);
          }
        );
    });
  }
  getCategoriesFromAPI() {
    return this.http.get(this.baseURL + this.categoriesURL, {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        'Access-Control-Allow-Origin': '*',
      }),
    });
  }

  getProductByCategoryId(categoryId: number): Observable<any> {
    return new Observable((observer) => {
      this.encryption(categoryId).subscribe(
        (res: any) => {
          const encryptedId = res.data;

          this.http
            .get(this.baseURL + this.productByCategoryIdURL, {
              headers: new HttpHeaders({
                'ngrok-skip-browser-warning': 'skip-browser-warning',
                'Access-Control-Allow-Origin': '*',
                category_id: encryptedId,
              }),
            })
            .subscribe(
              (products) => {
                observer.next(products);
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
  getProductById(id: number) {
    return new Observable((observer) => {
      this.encryption(id).subscribe(
        (res: any) => {
          const encryptedId = res.data;
          const headers = new HttpHeaders({
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            'Access-Control-Allow-Origin': '*',
            product_id: encryptedId,
          });

          this.http
            .get(this.baseURL + this.productByIdURL, { headers })
            .subscribe(
              (product) => {
                observer.next(product);
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
  getAllProducts(){
    let allProductsURL = environment.getAllProductsURL
    return this.http.get(this.baseURL + allProductsURL,{
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        'Access-Control-Allow-Origin': '*',
      }),
    })
  }

  addOrder(
    body: any,
    billing_address_id: string,
    delivery_address_id: string,
    orderStatus: string,
    paymentStatus: string
  ) {
    const headers = new HttpHeaders({
      delivery_address_id: delivery_address_id,
      billing_address_id: billing_address_id,
      payment_status: paymentStatus,
      order_status: orderStatus,
    });
    return this.http.post(this.baseURL + this.addOrderURL, body, { headers });
  }
  getOrders() {
    return this.http.get(this.baseURL + this.getOrdersURL, {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        'Access-Control-Allow-Origin': '*',
      }),
    });
  }
  encryption(data: any) {
    console.log('daata', data);
    // const headers = new HttpHeaders({ id: String(data) });
    return this.http.get(this.baseURL + this.encryptionURL, {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        'Access-Control-Allow-Origin': '*',
        id: String(data),
      }),
    });
  }
  getOrderDetailById(encryptedId: any) {
    return this.http.get(this.baseURL + this.getOrderDetailByIdURL, {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        'Access-Control-Allow-Origin': '*',
        order_id: encryptedId,
      }),
    });
  }


  logout(){
    this.userId=null;
  }
}
