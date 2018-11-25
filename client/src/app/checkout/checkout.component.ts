import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartList: any[] = [];
  items: any[] = [];
  constructor(private router: Router, private rest: RestService, private cart: CartService) { }

  ngOnInit() {
    var cartItems = this.cart.getCart();
    cartItems.forEach((item) => {
      this.items.push(1);
    })
    cartItems.forEach((item, i) => {
      this.cartList.push({
        product: item,
        quantity : this.items[i]
      })
    })

  

    console.log('Total tems ', JSON.stringify(cartItems))
  }




  get totalPrice() {
    return this.cartList.reduce((total, x) => {
      var rowTotal = x.quantity * x.product.price;
      return total + rowTotal;
    }, 0)
  }

  async pay() {
console.log('The raw data is ',{
  totalPrice: this.totalPrice,
  products: this.cartList
})
    var data = await this.rest.post('http://localhost:3000/api/paymentsuccess/orders', {
      totalPrice: this.totalPrice,
      products: this.cartList
    })
    if (data['success']) {
      localStorage.removeItem('cart');
      this.cart.totalItems = 0;
      console.log('Order successfull')
      this.router.navigate(['home/payment-success'])
    }
  }





}
