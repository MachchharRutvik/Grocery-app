import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Shared/Services/cart/cart.service';
import { ProductsService } from 'src/app/Shared/Services/products/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
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
    private service: ProductsService,private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.product_name = res['product_name'];
      this.product_id = Number(res['id']);
      this.product_category = res['product_category'];

      // this.product_img = this.product.imageUrl;
    });
    this.product = this.service.getProductById(this.product_id);
    console.log(this.product);
    this.product_price = this.product.price
    this.product_discount_price= this.product.discountPrice;
    console.log("cartItems", this.cartService.getCartItems())
  }
  
  countMinus() {
    if (this.numberOfProduct >= 1) {
      this.numberOfProduct = this.numberOfProduct - 1;
      this.product_discount_price = (this.product.discountPrice * this.numberOfProduct)
    }
  }
  countPlus() {
    this.numberOfProduct = this.numberOfProduct + 1;
    this.product_discount_price = this.product.discountPrice * this.numberOfProduct

  }
  addToCart(product: any){
    this.cartService.addToCart(product);
  // this.cartService.cartBehaviour.next(this.cartService.getCartItems());
    // this.cartService.cartGrandTotal.next(this.product_discount_price)
  }
}
