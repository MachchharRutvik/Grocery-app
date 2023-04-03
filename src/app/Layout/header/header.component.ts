import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductsService } from '../../Shared/Services/products/products.service';
import { Router } from '@angular/router';
import { CartService } from '../../Shared/Services/cart/cart.service';
import { ApiService } from 'src/app/Shared/Services/api/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, DoCheck {
  constructor(
    private service: ProductsService,
    private router: Router,
    private cartService: CartService,
    private api: ApiService
  ) {}
  ngDoCheck(): void {}

  ngOnInit() {
    this.cartService.cartSubTotal.subscribe((res) => (this.cartTotal = res));
    this.router.events.subscribe((res: any) => {
      if (res.url) {
        this.api.getCartData().subscribe((res) => {
          this.cartProducts = res;
          this.itemCount = res.length;
          console.log(this.itemCount, 'res');
        });

        this.cartService.cartDataSubject$.subscribe((res) => {
          this.cartProducts = res.values;
          console.log(res, 'cartproduct');
          this.itemCount = res.length;
          console.log(this.itemCount, 'cartproduct');
        });
      }

      const token = localStorage.getItem('token');
      if (token) {
        this.token = true;
      } else {
        this.token = false;
      }
    });

    // console.log(this.uniqueCategories)
    // this.cartService.cartDataSubject.subscribe(res=>{
    // this.cartProducts = res;
    // console.log("header",this.cartProducts)
    // this.itemCount = this.cartProducts.length;
    // console.log("item",this.itemCount)

    // })
    //  this.cartService.grandTotal$.subscribe((res)=>{
    //   this.cartTotal = res;
    // })
    // this.cartService.cartItems$.subscribe((res)=>{
    //   const cartValue = res;
    //   this.itemCount = cartValue.length;

    // })
    // console.log(this.cartTotal);
  }
  token = false;
  cartTotal = 0;
  itemCount!: number;
  cartProducts: any;
  products = this.service.groceryList;
  categories = this.service.getCategories();
  searchItem: any;
  category: any = 'All';

  onSubmit(event: any) {
    event.preventDefault();
    const value = this.searchItem;
    // console.log(value);

    if (value) {
      this.router.navigate(['./catalogue/search', this.category, value]);
    }
  }

  onSelectCategory(event: any) {
    this.category = event.target.value;
    // console.log(this.category);
    // if(this.category){
    //   this.router.navigate(['categories',this.category]);
    // }
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
