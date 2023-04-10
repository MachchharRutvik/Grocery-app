import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';

const routes: Routes = [
  {
    path:'all-categories',
    component:AllCategoriesComponent
  },
  {
    path: 'categories/:category',
    component: CategoryComponent,
  },
  {
    path: 'product-details/:slug/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'search/:value',
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
