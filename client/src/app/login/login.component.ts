import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private login: any = {};
  constructor(private data: MessageService, private rest: RestService) { }

  ngOnInit() {
  }

  async checkLogin() {
    if (this.validate()) {
      var data = await this.rest.post("http://localhost:3000/api/account/login", this.login);
      console.log('The login status is ', data.json())
      data = data.json();
      if (data['success']) {
        console.log('Correct login')
      }
    }
  }

  validate() {
    // alert("Hi pankaj"+this.login.password)
    if (this.login.email != undefined) {

      if (this.login.password != undefined) {
        return true;
      }
      else {
        this.data.error("Please enter password");
      }
    }
    else {
      this.data.error("Please enter email")
    }
  }

}
