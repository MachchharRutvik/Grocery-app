import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Shared/Services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ApiService,private route:Router) {}

  ngOnInit(): void {}
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  login() {
    const loginFormValue = this.loginForm.getRawValue();
    console.log('this login form value', loginFormValue);

    this.api.loginApi(loginFormValue).subscribe(
      (data: any) => {
        // alert(data.message);
        console.log(data);
        localStorage.setItem("token",data.data)
        this.route.navigate(['home']);
      },
      (error) => alert(error.error.message)
    );
  }
}
