import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Grocery } from 'src/app/Shared/Interfaces/groceryInterface';
import { ProductsService } from 'src/app/Shared/Services/products/products.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { filter } from 'rxjs';
import { CartService } from 'src/app/Shared/Services/cart/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  products: Grocery[] = this.productService.groceryList;
  groceryCategory: string | undefined;
  stores: String[] = [];
  searchWord:string | undefined;
  checkedStores: string[] = [];
  isNull = false;
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,private cartService:CartService
  ) { }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe((params) => {
      this.groceryCategory = params['category'];
      this.searchWord = params['value'];




      if(this.searchWord && this.groceryCategory){
        this.getSearchCategoryData(this.groceryCategory,this.searchWord)
      }
      else if (this.groceryCategory) {
        this.products = this.productService.getProductByCategories(this.groceryCategory);
        this.stores = this.productService.getProductsByStores(this.groceryCategory);
        // console.log(this.stores, this.groceryCategory,this.searchWord);
      }

    });
  }
getSearchCategoryData(category: string,word: string){
  this.products = this.productService.getProductsBySearchAndCategory(category,word);
  const duplicateStores = this.productService.getProductsByStores(category);
  this.stores = this.products.map(product =>  product.store)
}



  onChecked(event: any) {
    const store: string = event.target.value;
    if (event.target.checked) {
      this.checkedStores.push(store);
      console.log(this.checkedStores);
    }
    else {
      const id = this.checkedStores.indexOf(store);
      if (id != -1) {
        this.checkedStores.splice(id, 1);
      }
    }
    console.log(this.checkedStores)
    if(this.groceryCategory){
    console.log(this.groceryCategory);
     this.getFilteredData(this.groceryCategory);
    }
  }
  

getFilteredData(value: string){
  const duplicateProducts = this.productService.getProductByCategories(value);
  if (this.checkedStores && this.checkedStores.length > 0) {
    this.products = duplicateProducts.filter((product) => {
     return this.checkedStores.includes(product.store)
  
    })
  }
  else {
    this.products = this.productService.getProductByCategories(value);
  }

}
isClicked = false;
onDisplay(){
  this.isClicked = !this.isClicked;
}

addToCart(id:any){
  
  this.cartService.addToCart(id);
  console.log(this.cartService.getCartItems());
  this.cartService.cartBehaviour.next(this.cartService.getCartItems());
  
}

}