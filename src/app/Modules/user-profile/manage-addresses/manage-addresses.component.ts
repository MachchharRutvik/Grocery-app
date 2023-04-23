import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/Shared/Interfaces/address';
import { ApiService } from 'src/app/Shared/Services/api/api.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-manage-addresses',
  templateUrl: './manage-addresses.component.html',
  styleUrls: ['./manage-addresses.component.css'],
  providers: [MessageService,ConfirmationService]

})
export class ManageAddressesComponent implements OnInit {

  constructor(private router:Router,private api:ApiService,private messageService:MessageService,private confirmationService: ConfirmationService) {
   }

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
        this.showAddressDeleted()
        const index = this.customerAddresses.indexOf(address);
        if(index>=0){
         this.customerAddresses.splice(index,1);
        }
      })

    },(err)=>{
console.log(err);
      this.showAddressDeletedErr()
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
  showAddressDeleted(){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Address Deleted successfully' });
  }
  showAddressDeletedErr(){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Deleting Address' });
  }


  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: (type) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}

confirm2(address:any) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          
  
            this.api.encryption(address.id).subscribe((res:any)=>{
              let encryptedId = res.data
              this.api.deleteAddress(encryptedId).subscribe((res)=>{
                console.log(res);
                this.showAddressDeleted()
                const index = this.customerAddresses.indexOf(address);
                if(index>=0){
                 this.customerAddresses.splice(index,1);
                }
              })
        
            },(err)=>{
        console.log(err);
              this.showAddressDeletedErr()
            })
          
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        },
        reject: (type) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}
}
