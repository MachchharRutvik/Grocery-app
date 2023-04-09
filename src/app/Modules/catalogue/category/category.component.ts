import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Grocery } from 'src/app/Shared/Interfaces/groceryInterface';
import { ProductsService } from 'src/app/Shared/Services/products/products.service';
import { Router, ActivatedRoute, ParamMap, Route } from '@angular/router';
// import { filter } from 'rxjs';
import { CartService } from 'src/app/Shared/Services/cart/cart.service';
import { CartItem } from 'src/app/Shared/Interfaces/cartItem';
import { ApiService } from 'src/app/Shared/Services/api/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  products: any = this.productService.groceryList;

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
    private api: ApiService,private http : HttpClient
  ) {
    
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe((params) => {
      this.groceryCategorySlug = params['category'];
      let categories;
      this.api.getCategoriesFromAPI().subscribe((res: any) => {
        categories = res.data;
        // console.log(categories);
        let categoryId: any;
        

        
        categories.find((category: any) => {
          if (category.slug == this.groceryCategorySlug) {
            categoryId = category.id;
            console.log(categoryId);
            this.api.getProductByCategoryId(categoryId).subscribe((product) => {
              this.products = product.data;
              console.log('this.products', this.products);
            });
          }
        });
      });
      if(params['category']=='All'){
        this.api.getCategoriesFromAPI().subscribe((res:any)=>{
          this.products = res.data
          console.log("res",res)

        })
        
        
      }
      this.searchWord = params['value'];
      if (this.searchWord && this.groceryCategorySlug) {
        this.getSearchCategoryData(this.groceryCategorySlug, this.searchWord);
      } else if (this.groceryCategorySlug) {
        this.products = this.productService.getProductByCategories(
          this.groceryCategorySlug
        );
        this.stores = this.productService.getProductsByStores(
          this.groceryCategorySlug
        );
        // console.log(this.stores, this.groceryCategory,this.searchWord);
      }
    });
  }
  getSearchCategoryData(category: string, word: string) {
    this.products = this.productService.getProductsBySearchAndCategory(
      category,
      word
    );
    const duplicateStores = this.productService.getProductsByStores(category);
    this.stores = this.products.map((product: { store: any }) => product.store);
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
 
  
//   addToCart(product: any) {
//     this.http.get('http://localhost:3000/cart/').subscribe((res) => {
//       let cart:any = res
//       // console.log(product,"prodyuctr")
//      console.log(res,"getcart");
//      let userMatchedCart = cart.filter((res:any)=>res.userId ==this.api.userId)
//      console.log(userMatchedCart,"hasuserid")
//      let cartId = userMatchedCart[0].id
//      console.log(cartId,"cartId")
//     const cartProduct = {
//       id:product.product.id,
//       title:product.product.title,
//       amount:product.product.amount,
//       quantityCount:1,
//       subtotal:product.product.amount
//     }
//     console.log("cartarray",this.cartArray)
//     this.cartArray.push(cartProduct) 
//     let userCart = {
//       userId :this.api.userId,
//       cart:this.cartArray
//     }
//     console.log("cartarray",this.cartArray)

//     console.log("uawwercart",userCart)
//     // this.cartService.addToCart(cartProduct);
//     this.http.put('http://localhost:3000/cart/'+cartId,userCart).subscribe(res=>console.log(res,"cart data updated"),err=>console.log(err,"cart data error"))
//     console.log(product.product,"thisproduct")
//     // console.log(this.cartService.getCartItems(),"add to cart");
//   })
// }

addToCart(product: any) {
  this.cartService.addToCart(product)
  this.cartService.getCartTotal()
  // this.http.get('http://localhost:3000/cart/').subscribe((res) => {
  //   let cart: any = res;
  //   let userMatchedCart = cart.filter((res: any) => res.userId == this.api.userId);
  //   let cartId = userMatchedCart[0].id;
  //   let cartArray = userMatchedCart[0].cart;
  //   let existingProductIndex = cartArray.findIndex((item: any) => item.id === product.product.id);
  //   if (existingProductIndex !== -1) {
  //     cartArray[existingProductIndex].quantityCount += 1;
  //     cartArray[existingProductIndex].subtotal += product.product.amount;
  //   } else {
  //     const cartProduct = {
  //       id: product.product.id,
  //       title: product.product.title,
  //       amount: product.product.amount,
  //       quantityCount: 1,
  //       subtotal: product.product.amount,
  //     };
  //     cartArray.push(cartProduct);
  //   }
  //   let userCart = {
  //     userId: this.api.userId,
  //     cart: cartArray,
  //   };

  //   this.http.put('http://localhost:3000/cart/' + cartId, userCart).subscribe(
  //     (res) => console.log(res, 'cart data updated'),
  //     (err) => console.log(err, 'cart data error')
  //   );
  // });
}

  productDetails(product: any) {
    console.log("clicked",product);
    
    this.router.navigate([
      'catalogue/product-details',
      product.slug,product.id
    ]);
  }
}
