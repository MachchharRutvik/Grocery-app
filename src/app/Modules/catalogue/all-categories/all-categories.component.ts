import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Shared/Services/api/api.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getCategoriesFromAPI().subscribe((res:any)=>{
      this.allCategories = res.data
      console.log(this.allCategories,"response")
    })
  }
allCategories:any
}
