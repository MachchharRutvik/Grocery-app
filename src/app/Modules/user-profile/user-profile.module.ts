import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SidebarLinksComponent } from './sidebar-links/sidebar-links.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ManageAddressFormComponent } from './manage-address-form/manage-address-form.component';

@NgModule({
  declarations: [
    UserProfileComponent,SidebarLinksComponent, LoginComponent, SignupComponent, ManageAddressFormComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserProfileModule {}
