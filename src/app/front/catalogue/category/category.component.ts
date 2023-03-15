import { Component, OnInit } from '@angular/core';
import { Grocery } from 'src/app/groceryInterface';
import { ProductsService } from 'src/app/products.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  products: any =this.productService.groceryList;
  groceryCategory: any;
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.groceryCategory = this.route.snapshot.paramMap.get('category');
  }
  isChanged = false;
  onDisplay() {
    this.isChanged = !this.isChanged;
  }
  get filteredProducts() {
    if (this.groceryCategory == 'All') {
      return this.products;
    } else {
      return this.products.filter(
        (product: { category: any; }) => product.category === this.groceryCategory
      );
    }
  }
  uniqueStores = this.products.filter((value: { store: any; }, index: any, self: any[]) => {
    return (
      index ===
      self.findIndex((p: { store: any; }) => {
        return p.store === value.store;
      })
    );
  });
}
