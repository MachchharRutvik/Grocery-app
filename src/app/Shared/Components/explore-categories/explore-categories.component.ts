import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { count } from 'console';
import { ProductsService } from '../../Services/products/products.service';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.css'],
})
export class ExploreCategoriesComponent implements OnInit {
  constructor(private productService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    // console.log(this.countByCategory);
    this.productService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      this.categoriesName =res.data
      console.log(res.data,"res.data")
    });
  }
  categoryName: any;
  categoriesName:any;
  categories: any;
  // countByCategory = this.categories.reduce((accumulator:any, currentItem) => {
  //  this.categoryName = currentItem.category;
  //   accumulator[this.categoryName] = (accumulator[this.categoryName] || 0) + 1;
  //   return accumulator;
  // }, {});
}
