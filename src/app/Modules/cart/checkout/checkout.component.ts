import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../Shared/Services/cart/cart.service';
import { ApiService } from 'src/app/Shared/Services/api/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private router: Router,
    private api: ApiService
  ) {}
  grandTotal = 0;
  userAddresses: any;
  delivery_address_id: any;
  billing_address_id: any;
  paymentStatus = 'W4YV_pkH7OAkvZO4P1gbzA==';
  orderStatus = 'W4YV_pkH7OAkvZO4P1gbzA==';
  orderObj: any;
  cartData: any[] = [];
  product: any;

  ngOnInit(): void {
    this.cartService.cartSubTotal.subscribe((res) => (this.grandTotal = res));
    this.api.getUserDetails().subscribe((res) => {
      this.userAddresses = res.data.addresses;
    });
    this.api.getCartData().subscribe((res) => {
      console.log(res);
      res.map((res: any) => {
        this.product = {
          product_id: res.id,
          product_name: res.grocery_name,
          qty: res.quantity,
          product_amount: res.price,
          discount_type: 2,
          discount_amount: 1,
        };
        this.cartData.push(this.product);
      });

      console.log(this.cartData, 'this.cartdaratara');
    });
  }
  cancelOrder() {
    if (confirm('Are you sure you want to cancel the order?')) {
      // this.cartService.cartBehaviour.next([]);
      // this.cartService.cartGrandTotal.next(0);
      this.router.navigate(['']);
    }
  }
  onAddress(id: number) {
    this.api.encryption(id).subscribe((res: any) => {
      this.delivery_address_id = res.data;
      this.billing_address_id = res.data;
    });
  }
  placeOrder() {
    if (this.delivery_address_id && this.billing_address_id) {
      this.cartService.cartSubTotal.subscribe((res) => {
        this.grandTotal = res;
        this.orderObj = {
          order_date: this.date(),
          special_note: 'Special note',
          estimate_delivery_date: this.date(),
          sub_total: this.grandTotal,
          tax_amount: 20,
          discount_amount: 5,
          total_amount:
            this.grandTotal < 10 ? this.grandTotal : this.grandTotal - 5,
          paid_amount:
            this.grandTotal < 10 ? this.grandTotal : this.grandTotal - 5,
          payment_type: 2,
          order_products: this.cartData,
        };
        console.log(this.orderObj, 'this.orderobj');
        this.api
          .addOrder(
            this.orderObj,
            this.billing_address_id,
            this.delivery_address_id,
            this.orderStatus,
            this.paymentStatus
          )
          .subscribe(
            (res) => {
              console.log('response', res);
            },
            (err) => {
              console.log('errr', err);
            }
          );
        this.router.navigate(['/cart/myCart/checkout/order-placed']);
      });
    } else {
      alert('please select delivery address');
    }
  }
  date() {
    let date = new Date();
    var getYear = date.toLocaleString('default', { year: 'numeric' });
    var getMonth = date.toLocaleString('default', { month: '2-digit' });
    var getDay = date.toLocaleString('default', { day: '2-digit' });
    var dateFormat = getYear + '-' + getMonth + '-' + getDay;
    return dateFormat;
  }
}
