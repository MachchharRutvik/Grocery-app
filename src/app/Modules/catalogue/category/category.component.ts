import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Grocery } from 'src/app/Shared/Interfaces/groceryInterface';
import { ProductsService } from 'src/app/Shared/Services/products/products.service';
import { Router, ActivatedRoute, ParamMap, Route } from '@angular/router';
// import { filter } from 'rxjs';
import { CartService } from 'src/app/Shared/Services/cart/cart.service';
import { CartItem } from 'src/app/Shared/Interfaces/cartItem';
import { ApiService } from 'src/app/Shared/Services/api/api.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { error } from 'console';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [MessageService]
})
export class CategoryComponent implements OnInit {
  products: any 
  groceryCategorySlug: string | undefined;
  stores: String[] = [];
  searchWord: string | undefined;
  checkedStores: string[] = [];
  isNull = false;
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private api: ApiService, private http: HttpClient,private spinner: NgxSpinnerService,private messageService: MessageService
  ) {

  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
  this.spinner.show();
  setTimeout(() => {
    this.spinner.hide();
  }, 1500);
    this.route.params.subscribe((params) => {
      this.groceryCategorySlug = params['category'];
      let categories;
      this.api.getCategoriesFromAPI().subscribe((res: any) => {
        categories = res.data;
        let categoryId: any;
        console.log(categories,"categories")
        categories.find((category: any) => {
          if (category.slug == this.groceryCategorySlug) {
            categoryId = category.id;
            console.log(categoryId);
            this.api.getProductByCategoryId(categoryId).subscribe((product) => {
              const products = product.data;
              this.products = products.map((product:any)=>product.product)
              console.log('RutvikMachchhar', this.products);
            },(error)=>{
              console.log('RutvikMachchhar', error);
            });
          }
        });
      });
   

      this.searchWord = params['value'];
      if (this.searchWord) {
        // console.log("in category component", this.searchWord)
        this.api.getAllProducts().subscribe((res: any) => {
          let allProducts = res
          // console.log(allProducts,"allproducts")
          this.products = allProducts.data.filter((product: any) => {
             return product.title.toLowerCase().indexOf(this.searchWord?.toLowerCase()) != -1
          })
          if(this.products){
            console.log(this.products,"thisproducts")
          }
        })
      }
    });
  
  }
  onChecked(event: any) {
    const store: string = event.target.value;
    if (event.target.checked) {
      this.checkedStores.push(store);
      console.log(this.checkedStores);
    } else {
      const id = this.checkedStores.indexOf(store);
      if (id != -1) {
        this.checkedStores.splice(id, 1);
      }
    }
    console.log(this.checkedStores);
    if (this.groceryCategorySlug) {
      console.log(this.groceryCategorySlug);
      this.getFilteredData(this.groceryCategorySlug);
    }
  }

  getFilteredData(value: string) {
    const duplicateProducts = this.productService.getProductByCategories(value);
    if (this.checkedStores && this.checkedStores.length > 0) {
      this.products = duplicateProducts.filter((product) => {
        return this.checkedStores.includes(product.store);
      });
    } else {
      this.products = this.productService.getProductByCategories(value);
    }
  }
  isClicked = false;
  onDisplay() {
    this.isClicked = !this.isClicked;
  }

  addToCart(product: any) {
    let username=JSON.parse(localStorage.getItem("userName"))
    console.log("username",username)
    this.cartService.ADD_Cart_User_Wise(username,product,product.id)
    this.cartService.Get_Total(username)
    this.show();
    
  }

  productDetails(product: any) {
    console.log("clicked", product);

    this.router.navigate([
      'catalogue/product-details',
      product.slug, product.id
    ]);
  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added Successfully' });
}

}
