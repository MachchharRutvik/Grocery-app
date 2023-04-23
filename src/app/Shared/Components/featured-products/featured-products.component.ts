import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { CartService } from '../../Services/cart/cart.service';
import { CartItem } from "../../Interfaces/cartItem";
import { ProductsService } from '../../Services/products/products.service';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../Services/api/api.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
  providers: [MessageService]
})

export class FeaturedProductsComponent implements AfterViewInit {

  constructor(private category: ProductsService, private cartService: CartService, private messageService: MessageService, private api: ApiService) {
  }
  ngOnInit() {
    this.productImages = this.category.productImages
    this.api.getAllProducts().subscribe((res: any) => {
      this.products = res.data
      console.log("all Products", this.products)
    }, (err) => {
      console.log("error", err)
    })
  }
  products: any
  productImages:any
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


  addToCart(product: any) {
    let username = JSON.parse(localStorage.getItem("userName"))
    console.log("username", username)
    this.cartService.ADD_Cart_User_Wise(username, product, product.id)
    this.cartService.Get_Total(username)
    this.show();
    console.log(this.cartService.cartDataSubject$, "cartdataons=efksnk")
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added Successfully' });
  }

}

