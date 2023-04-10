import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { count } from 'console';
import { ProductsService } from '../../Services/products/products.service';
import { ApiService } from '../../Services/api/api.service';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.css'],
})
export class ExploreCategoriesComponent implements OnInit {
  constructor(private productService: ProductsService, private api:ApiService) {}

  ngOnInit(): void {
    // console.log(this.countByCategory);
    this.productService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      console.log(res.data,"res.data")
      this.categories.forEach((res:any)=>{
        this.api.getProductByCategoryId(res.id).subscribe((product) => {
          res.products = product.data.length
          this.products?.push(product.data)
          console.log(res,"res")
          this.categories.push(res);
        });
      })
    });
    this.productService.getCategories().subscribe((res:any)=>{
      this.categoriesName = res.data
    })
  }
  categoryName: any;
  categoriesName:any=[];
  categories: any;
  products:any=[]
  // countByCategory = this.categories.reduce((accumulator:any, currentItem) => {
  //  this.categoryName = currentItem.category;
  //   accumulator[this.categoryName] = (accumulator[this.categoryName] || 0) + 1;
  //   return accumulator;
  // }, {});
}
