import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { CategoryComponent } from './front/catalogue/category/category.component';
import { ExploreCategoriesComponent } from './explore-categories/explore-categories.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { TrendinItemsComponent } from './trendin-items/trendin-items.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { CatalogueModule } from './front/catalogue/catalogue.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent, ExploreCategoriesComponent, FeaturedProductsComponent, TrendinItemsComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,CommonModule,
    CatalogueModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
