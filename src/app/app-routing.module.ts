import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Modules/user-profile/login/login.component';
import { SignupComponent } from './Modules/user-profile/signup/signup.component';
import { HomeComponent } from './Shared/Components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'catalogue',
    loadChildren: () =>
      import('./Modules/catalogue/catalogue.module').then(
        (c) => c.CatalogueModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./Modules/cart/cart.module').then((c) => c.CartModule),
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./Modules/user-profile/user-profile.module').then(
        (c) => c.UserProfileModule
      ),
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/*
 {
    path: 'home/categories/:category',
    component: CategoryComponent,
  },
  {
    path: 'search/:category/:value',
    component: CategoryComponent,
  },
  {
    path: 'home/categories/:product_category/product-details/:product_name/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'home/featured-products/product-details/:product_category/:product_name/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'myCart',
    component: CartComponent,
  },
  {
    path: 'myCart/checkout',
    component: CheckoutComponent,
  },
  {
    path: 'myCart/checkout/orderPlaced',
    component: OrderPlacedComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'manage-addresses',
    component: ManageAddressesComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  */
