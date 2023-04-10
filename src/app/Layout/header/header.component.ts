import {
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { ProductsService } from '../../Shared/Services/products/products.service';
import { Router } from '@angular/router';
import { CartService } from '../../Shared/Services/cart/cart.service';
import { ApiService } from 'src/app/Shared/Services/api/api.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[MessageService]
})
export class HeaderComponent implements OnInit, DoCheck {
  constructor(
    private service: ProductsService,
    private router: Router,
    private cartService: CartService,
    private api: ApiService,
    private http: HttpClient,
    private messageService:MessageService
  ) {

  }
  ngDoCheck(): void {

  }

  ngOnInit() {
    this.api.getCategoriesFromAPI().subscribe(res => console.log(res))
    this.http.get('http://localhost:3000/cart/').subscribe((res) => {
      let cart: any = res;
      if (cart) {
        let userMatchedCart = cart.filter((res: any) => res.userId == this.api.userId);
        if (userMatchedCart) {
          let cartArray = userMatchedCart[0]?.cart
          this.cartService.cartDataSubject.next(cartArray)
        }
      }
    })
    this.cartService.cartDataSubject$.subscribe((res) => {
      this.cartProducts = res?.values;
      console.log(res, 'cartproduct');
      this.itemCount = res.length;
      console.log(this.itemCount, 'cartproduct');
      this.cartService.getCartTotal();
    });
    this.cartTotal = this.cartService.getCartTotal()
    console.log(this.cartTotal, "thiscarttotal")
    console.log(this.cartService.getCartTotal())

    this.cartService.cartSubTotal.next(this.cartTotal)
    this.cartService.cartSubTotal.subscribe((res) => (this.cartTotal = res));
    this.router.events.subscribe((res: any) => {
   
      const token = localStorage.getItem('token');
      if (token) {
        this.token = true;
        this.api.getUserDetails().subscribe((res) => {
          this.userDetails = res.data;
        })
      } else {
        this.token = false;
      }
    });
    this.api.getCategoriesFromAPI().subscribe((res: any) => {
      this.categories = res.data
    })

  }
  token = false;
  cartTotal = 0;
  itemCount!: number;
  cartProducts: any;
  products = this.service.groceryList;
  categories: any;
  searchItem: any;
  category: any = 'All';
  userDetails: any;
  onSubmit(event: any) {
    event.preventDefault();
    const value = this.searchItem;
    if (value) {
      this.router.navigate(['./catalogue/search', value]);
    }
  }

  // onSelectCategory(event: any) {
  //   this.category = event.target.value;
  //   // console.log(this.category);
  //   // if(this.category){
  //   //   this.router.navigate(['categories',this.category]);
  //   // }
  // }
  logout() {
    localStorage.removeItem('token');
    this.api.logout();
    const cart: never[] = []
    this.cartService.logoutCart.next(cart);
    this.cartService.cartSubTotal.next(0);
    this.userDetails = ''
    this.router.navigate(['/']);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logout successful' });
    window.location.reload();
  }
  allCategories() {
    this.router.navigate(['catalogue/all-categories'])
  }
}
