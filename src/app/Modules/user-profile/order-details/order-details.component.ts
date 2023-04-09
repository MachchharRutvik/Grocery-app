import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { ApiService } from 'src/app/Shared/Services/api/api.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {


  orderID: any;
  encryptedOrderId!: string;
  orderDetails: any;
  orderProducts: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,) {
    this.route.paramMap.subscribe((res) => {
      this.orderID = res.get('id');
      console.log(this.orderID,"thisorderid")
    });
  }
  order_details_items:any=[]
  ngOnInit() {
    if (this.orderID) {
      this.api.encryption(this.orderID).subscribe({
        next: (res: any) => {
          this.encryptedOrderId = res.data;
          console.log("encryptedData",this.encryptedOrderId)

          this.api.getOrderDetailById(this.encryptedOrderId).subscribe({
            next: (res: any) => {
              this.orderDetails=res.data
              this.order_details_items=res.data.order_items
              console.log("orderDetails",this.orderDetails);
              console.log("order_details_items",this.order_details_items);

            },
            error: (err: any) => {
             console.log('error in fetching order detail',err);
            },
          });
        },
        error: (err: any) => {
          console.log('error',err);
        },
      });
    }
  }
}
