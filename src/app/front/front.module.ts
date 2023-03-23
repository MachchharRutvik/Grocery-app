import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { MyCartComponent } from './user/my-cart/my-cart.component';


@NgModule({
  declarations: [MyCartComponent],
  imports: [
    CommonModule,
    FrontRoutingModule
  ],
  exports:[MyCartComponent]
})
export class FrontModule { }
