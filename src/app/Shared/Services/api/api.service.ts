import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http:HttpClient) {}
  baseURL = environment.baseURL;
  
  signUpApi(user: any){
    let signUpURL = environment.registerURL
    console.log("user",user);
    this.http.post(this.baseURL+signUpURL,user).subscribe(data=>console.log(data)
    ,error=>console.log(error)
    );
    
  }
}
