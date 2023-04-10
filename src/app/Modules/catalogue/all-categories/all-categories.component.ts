import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/Shared/Services/api/api.service';



@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {

  constructor(private api:ApiService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    this.api.getCategoriesFromAPI().subscribe((res:any)=>{
      this.allCategories = res.data

      console.log(this.allCategories,"response")
    })

  }
allCategories:any

}
