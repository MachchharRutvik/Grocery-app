import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/Shared/Services/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[MessageService]
})
export class SignupComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private route: Router,
    private fb: FormBuilder,
    private messageService:MessageService
  ) {
    this.signUpForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      primary_email: ['', [Validators.required, Validators.email]],
      primary_mobile_number: [
        '',
        [Validators.required, Validators.pattern('[6789][0-9]{9}')],
      ],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.formValues = this.signUpForm.getRawValue();
    console.log(this.formValues);
    console.log(this.first_name);
  }
  signUpForm!: FormGroup;
  formValues: any;
  ngOnInit(): void {
   
  }
  get first_name() {
    return this.signUpForm.get('first_name');
  }
  get last_name() {
    return this.signUpForm.get('last_name');
  }
  get primary_email() {
    return this.signUpForm.get('primary_email');
  }
  get primary_mobile_number() {
    return this.signUpForm.get('primary_mobile_number');
  }
  get username() {
    return this.signUpForm.get('username');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  signUp() {
    const userDetails = this.signUpForm.getRawValue();
    this.apiService.signUpApi(userDetails).subscribe(
      (data: any) => {
        localStorage.setItem('customerId', data.data.id);
        this.showSuccess(data.message);
        setTimeout(()=>{
          this.route.navigate(['login']);

        },1000)
      },
      (error) => {
        console.log(error)
        this.showError(error.error.message)}
    );
  }
  showSuccess(message){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  showError(message){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
