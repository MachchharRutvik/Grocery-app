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
  constructor(private productService: ProductsService, private api: ApiService) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      console.log(res.data, "res.data")
      if (this.categories.length > 0) {
        this.categories.forEach((category: any) => {
          this.api.getProductByCategoryId(category.id).subscribe((res) => {
            if (res) {
              category.productsLength = res.data.length
              console.log(category)
            }
          })
        })

      }
    });
    this.productService.getCategories().subscribe((res: any) => {
      this.categoriesName = res.data
    })
  }
  categoryName: any;
  categoriesName: any = [];
  categories: any;
  products: any = []
}
