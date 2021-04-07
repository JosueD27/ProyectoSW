import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from '../app/app.router';
import {GetMytodolistComponent} from './views/get_mytodolist/get_mytodolist.component';
import { AppService } from './app.service';
import {HttpClientModule} from '@angular/common/http';

import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    GetMytodolistComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
