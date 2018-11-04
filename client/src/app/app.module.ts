import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RestService } from './services/rest.service';
import { MessageService } from './services/message.service';
import { MessageComponent } from './message/message.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path : '',component : LoginComponent
      },
      {
        path : 'register',component : RegisterComponent
      },
      {
        path : 'home',component : HomeComponent
      }
    ])
  ],
  providers: [RestService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
