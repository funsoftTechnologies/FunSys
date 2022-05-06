import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "./angular-material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { AlertModule } from "./alert/alert.module";
import { ApiModule} from "./api/api.module";

import { AuthService} from "./security/auth.service";
import { AuthGuard } from "./security/auth-guard";

import { AppComponent } from './app.component';
import { LoginComponent } from "./security/login/login.component";
import { RegisterComponent } from "./security/register/register.component";
import { PageNotFoundComponent } from './api/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ApiModule,
    AppRoutingModule,
    RouterModule,
    FlexModule,
    AlertModule,
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  exports:[
    // AlertModule
  ]
})
export class AppModule { }
