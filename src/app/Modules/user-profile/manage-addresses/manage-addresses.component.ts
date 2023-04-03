import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-addresses',
  templateUrl: './manage-addresses.component.html',
  styleUrls: ['./manage-addresses.component.css']
})
export class ManageAddressesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  addAddress(){
    this.router.navigate(['user-profile/manage-address-form'])
  }
}
