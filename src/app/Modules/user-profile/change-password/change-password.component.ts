import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/Shared/password.validator';
import { ApiService } from 'src/app/Shared/Services/api/api.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [MessageService]

})
export class ChangePasswordComponent implements OnInit {

  constructor(private api:ApiService,private fb:FormBuilder,private messageService:MessageService) { 
    
  }
  
  ngOnInit(): void {
    
    
    }
    passwordForm = this.fb.group({
      currentPassword : ['',Validators.required],
      newPassword : ['',[Validators.required,Validators.minLength(8)]],
      confirmPassword : ['',Validators.required],
    },{validators:passwordValidator})

    get currentPassword(){
      return this.passwordForm.get('currentPassword')
    }
    get newPassword(){
      return this.passwordForm.get('newPassword')
    }
    get confirmPassword(){
      return this.passwordForm.get('confirmPassword')
    }
    changePassword(){
      const passwords = {
        oldPassword:this.currentPassword?.value,
        newPassword:this.newPassword?.value
      }
      console.log("password object",passwords);
      this.api.changePasswordApi(passwords).subscribe((res:any)=>{
        this.showPasswordChanged()
      },
      (err)=>{
        console.log(err);
        this.showPasswordError(err.error.message)
        // alert(err.error.message);
      });
      
    }
    showPasswordChanged(){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password Changed' });
    }
    showPasswordError(message:any){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }
}
