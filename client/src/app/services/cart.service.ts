import { SelectorMatcher } from "@angular/compiler";


export class CartService{
totalItems=0;

constructor(){
    this.totalItems=this.getCart().length;
}

getCart(){
var cart = localStorage.getItem('cart');
console.log('The cart is ',cart)
return cart?JSON.parse(cart):[];
}

addToCart(item){
var cart = this.getCart();

 var alreadyPresent =    cart.find((itemInCart)=>{
     return   JSON.stringify(itemInCart)==JSON.stringify(item);
    })
    if(alreadyPresent){
return false;
    }
    else{
cart.push(item);
localStorage.setItem('cart',JSON.stringify(cart))
this.totalItems++;
return true;
    }
}


}


