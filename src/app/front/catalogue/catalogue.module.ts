import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    CategoryComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    FormsModule
  ],exports:[
    CategoryComponent
  ]
})
export class CatalogueModule { }
