import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cartService : CartService) { }

  ngOnInit() {
  }

  get totalItems(){
    return this.cartService.totalItems;
  }

}
