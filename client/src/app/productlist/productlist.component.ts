import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
private products : any[]=[];
  constructor(private rest : RestService) { }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts(){
var data = await this.rest.get("http://localhost:3000/api/seller/productlist");

if(data['success']){
  console.log("the main list is ",data['products'])
  this.products = data['products'];
}
  }

}
