import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Shared/Services/api/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private api:ApiService, private router:Router){}
  allOrder:any[]=[]
  ngOnInit()
  {
    this.api.getOrders().subscribe({
    next:(res:any)=>{
      this.allOrder=res.data.orders
      console.log("all orders",this.allOrder);
    },//end next
    error:(err:any)=>{
      console.log("failure",err.message)
      console.log("all order eoor",err);

    }//end error
    })//end allOrderapi call


  }//end onInit
  getOrderDetails(id:any){
    this.router.navigate(['user-profile/orders/order-details',id])
  }

}
