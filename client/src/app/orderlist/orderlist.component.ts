import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
orders : any[] = [];
  constructor(private rest : RestService) { }

  async ngOnInit() {
   var data = await this.rest.get("http://localhost:3000/api/paymentsuccess/orders")
    if(data['success']){
      console.log("*****",data)
      this.orders = data['orders']

    }
  }

}
