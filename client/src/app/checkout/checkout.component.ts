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
cartList : any[]=[];
  constructor(private router : Router,private rest : RestService,private cart : CartService) { }

  ngOnInit() {
    var cartItems=this.cart.getCart();
    this.cartList = cartItems.map((cart)=>{
      return {
        name : cart.title,
        cost : cart.price,
        pic : cart.image,
        items : 1
      }
    })
    console.log('Total tems ',JSON.stringify(cartItems))
  }

  


  get totalPrice(){
return this.cartList.reduce((total,x)=>{
  var rowTotal = x.items*x.cost;
  return total+rowTotal;
},0)
  }

  async pay(){
    
var data = await this.rest.post('http://localhost:3000/api/paymentsuccess/orders',{
totalPrice : this.totalPrice,
products : this.cartList
})
   if(data['success']){
     console.log('Order successfull')
     this.router.navigate(['home/payment-success'])
   }
  }

  



}
