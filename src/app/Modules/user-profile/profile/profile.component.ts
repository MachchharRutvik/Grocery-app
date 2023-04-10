import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/Shared/Services/api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ApiService,private spinner:NgxSpinnerService) {}
  profileForm!: FormGroup;
  formValues: any;
  token: any;
  userDetails: any;
  ngOnInit(): void {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      primary_email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      primary_mobile_number: [
        { value: '', disabled: true },
        [Validators.required, Validators.pattern('[6789][0-9]{9}')],
      ],
      secondary_email: [''],
      secondary_mobile_number: [''],
      date_of_birth: ['', Validators.required],
     
    });
    this.formValues = this.profileForm.getRawValue();
    console.log(this.formValues);
    console.log(this.firstName);
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.api.getUserDetails().subscribe((res) => {
        this.userDetails = res.data;
        console.log('this.userdertail', this.userDetails);
        this.profileForm.patchValue(this.userDetails);
      });
    }
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  get firstName() {
    return this.profileForm.get('first_name');
  }
  get lastName() {
    return this.profileForm.get('last_name');
  }
  get email() {
    return this.profileForm.get('primary_email');
  }
  get contactNumber() {
    return this.profileForm.get('primary_mobile_number');
  }
  get dateOfBirth() {
    return this.profileForm.get('date_of_birth');
  }

  onSave() {
    this.formValues = this.profileForm.getRawValue();
    console.log('this.formvalues', this.formValues);
    const updateFields = {
      first_name: this.formValues.first_name,
      last_name: this.formValues.last_name,
      password: this.formValues.password,
      date_of_birth: this.formValues.date_of_birth,
      secondary_mobile_number: this.formValues.secondary_mobile_number,
      secondary_email: this.formValues.secondary_email,
    };
    this.api.updateUserDetails(updateFields).subscribe(
      (res: any) => {
        console.log('updated', res);
        alert(res.message);
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
}
