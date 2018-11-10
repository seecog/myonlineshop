import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private register: any = {};
  private isSellerStt: boolean = false;
  constructor(private route : Router,private rest: RestService, private data: MessageService) { }

  setStatus(stt) {
    this.isSellerStt = stt;
    console.log('Type o9f status is ', this.isSellerStt)
  }

  ngOnInit() {
  }

  goLogin(){
    this.route.navigate(['/'])
  }

  async doregister() {
    if (this.validate()) {
      var rawData = this.register;
      delete rawData.repassword;
      rawData.isSeller = this.isSellerStt;
      var data = await this.rest.post("http://localhost:3000/api/account/users", rawData)
      
     console.log('main status is ',data)
      if (data['success']) {
        this.data.success(data['message'])
        this.register = {};
      }
      else{
        this.data.error(data['message'])
      }
    }
  }

  validate() {
    if (this.register.name != undefined) {

      if (this.register.email != undefined) {

        if (this.register.password) {

          if (this.register.password == this.register.repassword) {
            return true;
          } else {
            this.data.error("Passowrd should equal to re password");
          }

        }
        else {
          this.data.error("Password required");
        }

      }
      else {
        this.data.error("Email required !")
      }

    }
    else {
      this.data.error("Name required !");

    }
  }


}
