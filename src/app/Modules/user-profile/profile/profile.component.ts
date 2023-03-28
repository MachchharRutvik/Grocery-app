import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  profileForm!:FormGroup;
  formValues:any;
  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      contactNumber:['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
      alternateEmail:[''],
      alternateContactNumber:[''],
      dateOfBirth:['',Validators.required]
    })
    this.formValues = this.profileForm.getRawValue();
    console.log(this.formValues);
    console.log(this.firstName)
    
    
  }
  get firstName(){
    return this.profileForm.get('firstName');
  }
  get lastName(){
    return this.profileForm.get('lastName');
  }
  get email(){
    return this.profileForm.get('email');
  }
  get contactNumber(){
    return this.profileForm.get('contactNumber');
  }
  get dateOfBirth(){
    return this.profileForm.get('dateOfBirth');
  }


}
