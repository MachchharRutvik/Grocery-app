import {
  Component,
  OnInit,
} from '@angular/core';
import { ProductsService } from '../../Shared/Services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
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
export class HeaderComponent implements OnInit {
  constructor(
    private service: ProductsService,
    private router: Router,
    private route:ActivatedRoute,
    private cartService: CartService,
    private api: ApiService,
    private http: HttpClient,
    private messageService:MessageService,
   
  ) {
    this.router.events.subscribe((res:any)=>{
      if(res.url){
        if(localStorage.getItem('token')){
          this.token = true
        }
      }
    })
  }
 

  ngOnInit() {
   
    let username=JSON.parse(localStorage.getItem("userName"))
    if(username){
      this.userDetails = username
      this.cartService.Get_Total(username)
      this.cartService.User_Add_Cart(username)
      this.api.getCategoriesFromAPI().subscribe(res => console.log(res))
      this.cartService.cartDataSubject$.subscribe((res) => {
        if(res){
          console.log(res, 'cartproduct');
          this.cartProducts = res?.values;
          this.itemCount = res.length;
          console.log(this.itemCount, 'cartproduct');
          // this.cartService.getCartTotal();
  
        }
      });
    }
    // this.cartTotal = this.cartService.getCartTotal()
    // console.log(this.cartTotal, "thiscarttotal")
    // console.log(this.cartService.getCartTotal())

    // this.cartService.cartSubTotal.next(this.cartTotal)
    this.cartTotal = this.cartService.headerItemsTotal
    this.cartService.cartSubTotal.subscribe((res) => (this.cartTotal = res));
    // this.itemCount = this.cartService.headerItemsCount
    this.cartService.itemCount.subscribe((res)=>(this.itemCount = res))
    
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('customerId');
    console.log("removed token");
    this.token = false
    this.router.navigate(['/']);
    
  }
    allCategories() {
    this.router.navigate(['catalogue/all-categories'])
  }
}
