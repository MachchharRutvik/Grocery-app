import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../../Interfaces/cartItem';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  quantityCount: any;
  constructor(private http: HttpClient) {}
  baseURL = environment.baseURL;
  userDetailsURL = environment.userDetailsURL;
  changePasswordURL = environment.changePasswordURL;
  addAddressURL = environment.addAddressURL;

  signUpApi(user: any) {
    let signUpURL = environment.registerURL;
    console.log('user', user);
   return this.http.post(this.baseURL + signUpURL, user)
  }
  loginApi(user:any){
    let loginURL = environment.loginURL;
    return this.http.post(this.baseURL+loginURL,user);
  }
  getUserDetails(){
    // const headers = {'Authorization': 'Bearer ' + token}
    return this.http.get(this.baseURL+this.userDetailsURL);
  }
  addToCartApi(product: CartItem) {
    return this.http.post('http://localhost:3000/cart', product);
  }
  getCartData() {
    return this.http.get<any>('http://localhost:3000/cart');
  }
  changePasswordApi(passwords: { oldPassword: any; newPassword: any; }){
    return this.http.put(this.baseURL+this.changePasswordURL,passwords);
  }
  // quantityPlus(id:number,quantityCount:number) {
  //   this.http.get<any>('http://localhost:3000/cart/'+id).subscribe((res)=>{
  //     const product = res;
  //     const data = {...product,quantityCount:quantityCount};
      
  //     return this.http.put<any>('http://localhost:3000/cart/'+id,data).subscribe(res=>{
  //       console.log("updated QuantityCount",res);
        
  //     })
  //   })

  // }

  updateItem(item:CartItem){
    try {

      return this.http.put<CartItem>('http://localhost:3000/cart/'+item.id,item);
      
    } catch (error:any) {
      return throwError(()=>new Error(error))
      
    }
  }
  deleteProduct(product:CartItem){
    return this.http.delete<CartItem>('http://localhost:3000/cart/'+product.id);
  }
  addAddress(formValues:any){
    return this.http.post(this.baseURL+this.addAddressURL,formValues);
  }
}
