import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { ManageAddressesComponent } from './manage-addresses/manage-addresses.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ManageAddressFormComponent } from './manage-address-form/manage-address-form.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'manage-addresses',
        component: ManageAddressesComponent,
      },
      {
        path: 'manage-address-form',
        component: ManageAddressFormComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {
  constructor() {
    console.log('User profile module loaded');
  }
}
