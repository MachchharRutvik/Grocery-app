import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';

const routes: Routes = [
  {
    path:'myCart',
    component:CartComponent
  },
  {
    path:'myCart/checkout',
    component:CheckoutComponent
  },
  {
    path:'myCart/checkout/order-placed',
    component:OrderPlacedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { 
  constructor(){
    console.log("cart module loaded ")
  }
}
