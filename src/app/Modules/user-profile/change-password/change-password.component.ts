import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/Shared/password.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb:FormBuilder) { 
    
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
    

}
