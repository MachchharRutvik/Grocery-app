import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service:ProductsService) { }

  ngOnInit(): void {
// console.log(this.uniqueCategories)
  }
  products=this.service.groceryList;
  uniqueCategories = this.service.uniqueCategories

}
