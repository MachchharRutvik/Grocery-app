import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: 'categories/:category',
    component: CategoryComponent,
  },
  {
    path: 'product-details/:product_name/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'search/:category/:value',
    component: CategoryComponent,
  },
  {
    path: 'categories/:category',
    component: CategoryComponent,
  },
 
  {
    path: 'product-details/:product_category/:product_name/:id',
    component: ProductDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogueRoutingModule {
  constructor() {
    console.log('Catalogue module');
  }
}
