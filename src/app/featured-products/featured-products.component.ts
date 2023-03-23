import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { CartService } from '../cart.service';
import { CartItem } from "../cartItem";
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})

export class FeaturedProductsComponent implements AfterViewInit {

  constructor(private category:ProductsService,private cartService:CartService) { 
  

  }
  categoriesName = this.category.categoriesName;
  ngAfterViewInit() {
    const mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      cssMode: false,
      slidesPerView: 6,
      spaceBetween: 30,
      loop: false,
      wrapperClass: 'swiper-wrapper',
  slideClass: 'swiper-slide',

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // Pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
 
  products = this.category.groceryList;  
    addToCart(id:any){
    // console.log("button clicked")
  const cartProduct = this.category.getProductById(id);
  const cartItems:CartItem = {
    id:Number(cartProduct?.id),
    grocery_name:String(cartProduct?.grocery_name),
    price:Number(cartProduct?.price),
    quantity:1, 
    quantityCount:1,
    subtotal:Number(cartProduct?.price),
    imageUrl:String(cartProduct?.imageUrl),
  }
  // console.log("cartItems",cartItems);
  this.cartService.addToCart(cartItems);
  console.log("getCart",this.cartService.getCartItems());
    this.cartService.cartSubject.next(this.cartService.getCartItems());
  }
   

  
}

