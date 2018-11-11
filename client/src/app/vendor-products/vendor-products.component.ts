import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.css']
})
export class VendorProductsComponent implements OnInit {
  products: any[] = [];
  closeResult: string;
  addProductForm: any = {};
  categories: any[] = [];
  saveStt : boolean = false;
  updateId : string;
  p: number = 1;
  constructor(private rest: RestService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  async getCategories() {

    var data = await this.rest.get("http://localhost:3000/api/admin/categories");
    console.log('The list is ', data['categories'])
    this.categories = data['categories'];
  }

  async saveProduct() {
    console.log("The form value is ", this.addProductForm);
    var data = await this.rest.post("http://localhost:3000/api/seller/products", this.addProductForm);
    console.log('The list is ', data);
    this.getProducts();
  }

  async getProducts() {
    var data = await this.rest.get('http://localhost:3000/api/seller/products/users');
    console.log('The final data is ', data)
    if (data['success']) {
      this.products = data['products'];
    }
  }

  clearForm() {
    this.saveStt = false;
    this.addProductForm = {};
  }

 async editProduct(id) {
    console.log('Edit id is ',id)
    this.updateId = id;
    this.saveStt = true;
    var data = await this.rest.get("http://localhost:3000/api/seller/productbyid/" + id);
    console.log('The response is ',data)
    this.addProductForm = data['product'];
  }

  async updateProduct(){
    var data = await this.rest.put("http://localhost:3000/api/seller/products/" + this.updateId,this.addProductForm);
    console.log('The response is ',data)
    if(data['success']){
      this.getProducts();
    }
  }

  async deleteProduct(id) {
    if (confirm('Are you sure to delete record ?')) {
      var data = await this.rest.delete('http://localhost:3000/api/seller/products/' + id);
      if (data['success']) {
        this.getProducts();
      }
    }
  }

  open(content) {
    // console.log('The content is ',content)
    // this.clearForm();
    // this.saveStt = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

}
