import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.css']
})
export class ExploreCategoriesComponent implements OnInit {

  constructor(private category:ProductsService) { }

  ngOnInit(): void {
  }
  categoriesName=this.category.categoriesName;
  categories = [
    {
      img:"../assets/peach.png",
      category:"peach",
      numberOfItems:"20"
    },
    {
      img:"../assets/peach.png",
      category:"peach",
      numberOfItems:"20"
    },
    {
      img:"../assets/peach.png",
      category:"peach",
      numberOfItems:"20"
    },
    {
      img:"../assets/peach.png",
      category:"peach",
      numberOfItems:"20"
    },
    {
      img:"../assets/peach.png",
      category:"peach",
      numberOfItems:"20"
    },
    {
      img:"../assets/peach.png",
      category:"peach",
      numberOfItems:"20"
    },
    {
      img:"../assets/peach.png",
      category:"peach",
      numberOfItems:"20"
    },
    {
      img:"../assets/peach.png",
      category:"peach",
      numberOfItems:"20"
    }
     
  ]

}
