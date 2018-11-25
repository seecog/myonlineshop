import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../services/rest.service';
import { CartService } from '../services/cart.service';
import { MessageService } from '../services/message.service';
import {RatingModule} from "ngx-rating";
@Component({
  selector: 'app-productdes',
  templateUrl: './productdes.component.html',
  styleUrls: ['./productdes.component.css']
})
export class ProductdesComponent implements OnInit{
private para : any;
private review : any={};
private product : any = {};
starsCount : number;
  constructor(private mess : MessageService,private cartService :  CartService,private rest: RestService, private paramObj: ActivatedRoute)
 {
this.paramObj.params.subscribe((para)=>{
    this.para = para['id'];
  })
}

ngOnInit(){
  this.getProduct();
}

async saveReview(){
  console.log('The review is ',this.product)
  // this.review.productId = this.product._id;
  
  // var data = await this.rest.post("http://localhost:3000/api/customer/reviews",this.review);
  // console.log('The review data is ',data)
  //    if (data['success']) {
  //     console.log("-->", data);
  //     console.log('review saved')
  //   }

}

  async getProduct() {

    var data = await this.rest.get("http://localhost:3000/api/seller/productbyid/" + this.para);
  console.log('The product data is ',data)
     if (data['success']) {
      console.log("-->", data['product']);
      this.product = data['product'];
    }

  }

  addToCarti(item){

var stt = this.cartService.addToCart(item);
if(stt){
this.mess.success("Product added successfully !")
}
else{
this.mess.error("Product already present")
}
  }


}
