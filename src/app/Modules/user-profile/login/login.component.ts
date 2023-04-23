import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ApiService } from 'src/app/Shared/Services/api/api.service';
import { CartService } from 'src/app/Shared/Services/cart/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ApiService, private route: Router, private cartservice: CartService,private messageService: MessageService) {

  }

  ngOnInit(): void {

  }
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  login() {
    const loginFormValue = this.loginForm.getRawValue();
    this.api.loginApi(loginFormValue).subscribe(
      (data: any) => {
        console.log(data, "data")
        if (data) {
          this.showSuccess()
          let userName = data.data.user.username
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('userName', JSON.stringify(userName))
          console.log(userName, "username")
          setTimeout(()=>{
            this.route.navigate(['']);
          },1000)

        }
      },
      (error) => this.showError(error.error.message)
    );
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged in Successfully' });
}
  showError(error:any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail:error });
}
}
