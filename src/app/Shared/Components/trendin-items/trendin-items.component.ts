import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trendin-items',
  templateUrl: './trendin-items.component.html',
  styleUrls: ['./trendin-items.component.css']
})
export class TrendinItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  products = [
    {
      img:"../assets/peach.png",
      name:"orange 1Kg",
      reviews:"review",
      price:"$3.99",
      discountedPrice:"$2"
    },
    {
      img:"../assets/peach.png",
      name:"orange 1Kg",
      reviews:"review",
      price:"$3.99",
      discountedPrice:"$2"
    },
    {
      img:"../assets/peach.png",
      name:"orange 1Kg",
      reviews:"review",
      price:"$3.99",
      discountedPrice:"$2"
    }
  ]

}
