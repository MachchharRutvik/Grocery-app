import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { CartService } from '../../Services/cart/cart.service';
import { CartItem } from "../../Interfaces/cartItem";
import { ProductsService } from '../../Services/products/products.service';

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
    addToCart(product:any){
  this.cartService.addToCart(product);
  console.log(this.cartService.cartDataSubject$,"cartdataons=efksnk")
  

 
  }
   

  
}

