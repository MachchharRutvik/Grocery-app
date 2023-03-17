import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private service:ProductsService,private router:Router) { }

  ngOnInit(): void {
// console.log(this.uniqueCategories)
  }
  products=this.service.groceryList;
  categories = this.service.getCategories();
  searchItem:any ;
  category:any="All";
  onSubmit(event: any){
    event.preventDefault();
    const value = this.searchItem;
    // console.log(value);
    
    if(value){
      this.router.navigate(['search',this.category,value]);
    }
  }

  onSelectCategory(event: any){
    this.category =event.target.value;
    // console.log(this.category);
    // if(this.category){
    //   this.router.navigate(['categories',this.category]);
    // }
  }
  }


