import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})

export class FeaturedProductsComponent implements AfterViewInit {

  constructor(private category:ProductsService) { }
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
 
  products = [
    {
      image:"../assets/redish.png",
      category:"vegetables",
      name:"redish 500g",
      reviews:"rewievs",
      discountPrice:"$2",
      price:"$3.99",

    },
    {
      image:"../assets/redish.png",
      category:"vegetables",
      name:"redish 500g",
      reviews:"rewievs",
      discountPrice:"$2",
      price:"$3.99",

    },
    {
      image:"../assets/redish.png",
      category:"vegetables",
      name:"redish 500g",
      reviews:"rewievs",
      discountPrice:"$2",
      price:"$3.99",

    },
    {
      image:"../assets/redish.png",
      category:"vegetables",
      name:"redish 500g",
      reviews:"rewievs",
      discountPrice:"$2",
      price:"$3.99",

    },
    {
      image:"../assets/redish.png",
      category:"vegetables",
      name:"redish 500g",
      reviews:"rewievs",
      discountPrice:"$2",
      price:"$3.99",

    },
    {
      image:"../assets/redish.png",
      category:"vegetables",
      name:"redish 500g",
      reviews:"rewievs",
      discountPrice:"$2",
      price:"$3.99",

    },
    {
      image:"../assets/redish.png",
      category:"vegetables",
      name:"redish 500g",
      reviews:"rewievs",
      discountPrice:"$2",
      price:"$3.99",

    },
    {
      image:"../assets/redish.png",
      category:"vegetables",
      name:"redish 500g",
      reviews:"rewievs",
      discountPrice:"$2",
      price:"$3.99",

    },
    {
      image:"../assets/redish.png",
      category:"vegetables",
      name:"redish 500g",
      reviews:"rewievs",
      discountPrice:"$2",
      price:"$3.99",

    },
    {
      image:"../assets/redish.png",
      category:"vegetables",
      name:"redish 500g",
      reviews:"rewievs",
      discountPrice:"$2",
      price:"$3.99",

    }
  ]
   swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  
}

