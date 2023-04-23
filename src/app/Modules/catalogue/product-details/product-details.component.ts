import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/Shared/Services/api/api.service';
import { CartService } from 'src/app/Shared/Services/cart/cart.service';
import { ProductsService } from 'src/app/Shared/Services/products/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers:[MessageService]
})
export class ProductDetailsComponent implements OnInit {
  product_slug:any
  product: any;
  product_name: any;
  product_category: any;
  product_id: any;
  product_img: any;
  numberOfProduct: number = 1;
  product_price!:number;
  product_discount_price!:number;
  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,private cartService:CartService,private api:ApiService,
    private messageService:MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.product_name = res['product_name'];
      this.product_id = Number(res['id']);
      this.product_category = res['product_category'];
      this.product_slug = res['slug']
      console.log("product details",this.product_id)
    });
    if(this.product_id){
      this.api.getProductById(this.product_id).subscribe((product:any)=>{
       this.product = product.data
       this.product.quantity = 1
       console.log(product.data);
      },(err)=>{
       console.log(err,"err");
      })
    }
    // this.product = this.service.getProductById(this.product_id);
    // console.log(this.product);
    // this.product_price = this.product.price
    // this.product_discount_price= this.product.discountPrice;
    // console.log("cartItems", this.cartService.getCartItems())
  }
  
  // countMinus() {
  //   if (this.numberOfProduct >= 1) {
  //     this.numberOfProduct = this.numberOfProduct - 1;
  //     this.product_discount_price = (this.product.discountPrice * this.numberOfProduct)
  //   }
  // }
  // countPlus() {
  //   this.numberOfProduct = this.numberOfProduct + 1;
  //   this.product_discount_price = this.product.discountPrice * this.numberOfProduct

  // }
  addToCart(product: any){
    let username=JSON.parse(localStorage.getItem("userName"))
    console.log("username",username)
    this.cartService.ADD_Cart_User_Wise(username,product,product.id)
    this.cartService.Get_Total(username)
    this.show();
    
  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added Successfully' });
}

}
