import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { SliderComponent } from './Shared/Components/slider/slider.component';
import { ExploreCategoriesComponent } from './Shared/Components/explore-categories/explore-categories.component';
import { FeaturedProductsComponent } from './Shared/Components/featured-products/featured-products.component';
import { TrendinItemsComponent } from './Shared/Components/trendin-items/trendin-items.component';
import { HomeComponent } from './Shared/Components/home/home.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './Modules/cart/checkout/checkout.component';
import { ProfileComponent } from './Modules/user-profile/profile/profile.component';
import { ChangePasswordComponent } from './Modules/user-profile/change-password/change-password.component';
import { SidebarLinksComponent } from './Modules/user-profile/sidebar-links/sidebar-links.component';
import { OrderPlacedComponent } from './Modules/cart/order-placed/order-placed.component';
import { OrdersComponent } from './Modules/user-profile/orders/orders.component';
import { ManageAddressesComponent } from './Modules/user-profile/manage-addresses/manage-addresses.component';
import { OrderDetailsComponent } from './Modules/user-profile/order-details/order-details.component';
import { AuthInterceptor } from './Shared/Services/auth.interceptor';
import { FeaturesComponent } from './Shared/Components/features/features.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent, ExploreCategoriesComponent, FeaturedProductsComponent, TrendinItemsComponent, HomeComponent, CheckoutComponent, OrderPlacedComponent, ProfileComponent, ChangePasswordComponent, OrdersComponent, ManageAddressesComponent,OrderDetailsComponent, FeaturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,CommonModule,FormsModule,
    HttpClientModule,ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
