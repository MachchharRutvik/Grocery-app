import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
     this.cartService.cartSubject.subscribe(res=>{
      this.cartItems = res;
     })
     console.log(this.cartItems);
  }
  cartItems:any;
}
