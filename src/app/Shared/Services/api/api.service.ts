import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { cart } from '../../Interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  quantityCount: any;
  constructor(private route: Router, private http: HttpClient) {
    if(localStorage.getItem('token')){
      this.getUserDetails().subscribe((res) => {
        this.userId = res.data.id;
        console.log(this.userId, "usserID");
      });
    }
  }
  ngOnInit() {
    if(localStorage.getItem('token')){
      this.getUserDetails().subscribe((res) => {
        this.userId = res.data.id;
        console.log(this.userId, "usserID");
      });
    }
  }
  cart: { [key: string]: cart[] } = {}
  userId: any
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
    try {
      return this.http.post(this.baseURL + signUpURL, user)
    } catch (error) {
      return throwError(() => new Error(error))
    }
  }
  loginApi(user: any) {
    let loginURL = environment.loginURL;
    try {
      return this.http.post(this.baseURL + loginURL, user)
    } catch (error) {
      return throwError(() => new Error(error));
    }
  }
  getUserDetails() {
    try {
      return this.http.get<any>(this.baseURL + this.userDetailsURL, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
        }),
      });

    } catch (error) {
      return throwError(() => new Error(error))
    }
  }
  changePasswordApi(passwords: { oldPassword: any; newPassword: any }) {
    try {
      return this.http.put(this.baseURL + this.changePasswordURL, passwords);

    } catch (error) {
      return throwError(() => new Error(error))
    }
  }
  updateUserDetails(userDetails: {
    first_name: any;
    last_name: any;
    password: any;
    date_of_birth: any;
    secondary_mobile_number: any;
    secondary_email: any;
  }) {
    try {
      return this.http.put(this.baseURL + this.updateUserDetailsURL, userDetails);
    } catch (error) {
      return throwError(() => new Error(error))
    }
  }
  
  addAddress(formValues: any) {
    try {
      return this.http.post(this.baseURL + this.addAddressURL, formValues);
    } catch (error) {
      return throwError(()=>throwError(error))
    }
  }
  deleteAddress(encryptedId: any) {
    try {
      return this.http.delete(this.baseURL + this.deleteAddressURL, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          address_id: encryptedId,
        }),
      });
      
    } catch (error) {
      return throwError(()=>new Error(error));
    }
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
    try {
      return this.http.get(this.baseURL + this.categoriesURL, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
        }),
      });
      
    } catch (error) {
      return throwError(()=>new Error(error));
    }
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
  getAllProducts() {
    let allProductsURL = environment.getAllProductsURL
    try {
      return this.http.get(this.baseURL + allProductsURL, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
        }),
      })
    } catch (error) {
      return throwError(()=>new Error(error))
    }
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
    try {
      return this.http.post(this.baseURL + this.addOrderURL, body, { headers });
    } catch (error) {
      return throwError(()=>new Error(error));
    }
  }
  getOrders() {
    try {
      return this.http.get(this.baseURL + this.getOrdersURL, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
        }),
      });
    } catch (error) {
      return throwError(()=>new Error(error))
    }
  }
  encryption(data: any) {
    try {
      return this.http.get(this.baseURL + this.encryptionURL, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          id: String(data),
        }),
      });
    } catch (error) {
      return throwError(()=>new Error(error))
    }
  }
  getOrderDetailById(encryptedId: any) {
    try {
      return this.http.get(this.baseURL + this.getOrderDetailByIdURL, {
        headers: new HttpHeaders({
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
          order_id: encryptedId,
        }),
      });
      
    } catch (error) {
      return throwError(()=>new Error(error))
    }
  }


  logout() {
    this.userId = null;
  }
}
