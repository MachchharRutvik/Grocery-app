import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart/cart.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    CategoryComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    AllCategoriesComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    FormsModule,NgxSpinnerModule,ToastModule
  ],exports:[
    CategoryComponent
  ]
})
export class CatalogueModule { }
