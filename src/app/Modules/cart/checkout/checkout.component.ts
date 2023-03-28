import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../Shared/Services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService:CartService,private router:Router) { 
  

  }
  grandTotal=0
  ngOnInit(): void {
     this.cartService.grandTotal$.subscribe((amount)=>{
      this.grandTotal = amount;
    })
  
  }
  cancelOrder(){
    if(confirm("Are you sure you want to cancel the order?")){
      this.cartService.cartBehaviour.next([]);
      this.cartService.cartGrandTotal.next(0);
      this.router.navigate([''])
    }
  }
  
}
