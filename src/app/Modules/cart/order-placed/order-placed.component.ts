import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Shared/Services/api/api.service';
import { CartService } from 'src/app/Shared/Services/cart/cart.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.emptyCart()
  }

}
