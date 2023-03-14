import { Component, OnInit } from '@angular/core';
import { Grocery } from 'src/app/groceryInterface';
import { ProductsService } from 'src/app/products.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  products:Grocery[]=[];
  groceryCategory:any;
  constructor(private productService:ProductsService,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.products = this.productService.groceryList;
    // console.log(this.route.queryParams);
    
    this.groceryCategory= this.route.snapshot.paramMap.get('category')  }
  isChanged = false;
  onDisplay(){
    this.isChanged = !this.isChanged
  }
  get filteredProducts(){
    if(this.groceryCategory == "All"){
      return this.products;
    }else{
      return this.products.filter(product=> product.category === this.groceryCategory)
    }
  }

}
