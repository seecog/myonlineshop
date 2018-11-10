import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.css']
})
export class VendorProductsComponent implements OnInit {
  products: any[] = [];
  closeResult: string;
  addProductForm : any={};
  
  constructor(private rest: RestService,private modalService: NgbModal) { 
    
  }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    var data = await this.rest.get('http://localhost:3000/api/seller/products/users');
    console.log('The final data is ', data)
    if (data['success']) {
      this.products = data['products'];
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
