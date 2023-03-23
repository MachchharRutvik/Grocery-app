import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './front/catalogue/cart/cart.component';
import { CategoryComponent } from './front/catalogue/category/category.component';
import { ProductDetailsComponent } from './front/catalogue/product-details/product-details.component';
import { MyCartComponent } from './front/user/my-cart/my-cart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'categories/:category',component:CategoryComponent
  },
  {
    path:'search/:category/:value',component:CategoryComponent
  },
  {
    path:'featured-products/product-details/:product_category/:product_name/:id',component:ProductDetailsComponent
  },
  {
    path:"myCart",
    component:CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
