import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/Shared/Interfaces/address';
import { ApiService } from 'src/app/Shared/Services/api/api.service';

@Component({
  selector: 'app-manage-addresses',
  templateUrl: './manage-addresses.component.html',
  styleUrls: ['./manage-addresses.component.css']
})
export class ManageAddressesComponent implements OnInit {

  constructor(private router:Router,private api:ApiService) { }

  ngOnInit(): void {
    this.api.getUserDetails().subscribe((res)=>{
      this.customerAddresses = res.data.addresses
      this.userName = res.data.first_name+' '+res.data.last_name
      console.log("customer address",this.customerAddresses);
      console.log(this.showCustomerAddresses,"this.showcustomer")
    },
    (err)=>{
      console.log("error",err);
      
    })
  }
  customerAddresses:Address[] = [];
  showCustomerAddresses:Address[]=[];
  userName:string=''
  addAddress(){
    this.router.navigate(['user-profile/manage-address-form'])
  }
  deleteAddress(address:Address){
    this.api.encryption(address.id).subscribe((res:any)=>{
      let encryptedId = res.data
      this.api.deleteAddress(encryptedId).subscribe((res)=>{
        console.log(res);
        const index = this.customerAddresses.indexOf(address);
        if(index>=0){
         this.customerAddresses.splice(index,1);
        }
      })

    },(err)=>{
console.log(err);
    })
  }
  updateAddress(address:Address){
    this.router.navigate(['/user-profile/manage-address-form',address.id])

      // this.api.updateAddress(encryptedId,body).subscribe((res)=>{
      //   console.log(res); 
      // },
      // (err:any)=>{
      //   console.log(err);
        
      // })

    // })
  }
  // getAddressToShow(addresses:any){
  //   this.showCustomerAddresses= addresses.filter((res:any)=>{
  //     console.log(res)
  //     return res.updatedAt > res.deleted_at

  //   })

  // }

}
