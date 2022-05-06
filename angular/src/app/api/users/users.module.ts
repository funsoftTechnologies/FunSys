import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AlertModule } from "../../alert/alert.module";
import { ImageCropperModule } from 'ngx-image-cropper';
import { UsersRoutingModule } from "./users-routing.module";
import { AngularMaterialModule } from "../../angular-material.module";

import { UsersHomeComponent } from "./users-home.component";
import { ProfilComponent } from "./profil/profil.component";
import { UsersComponent } from "./users.component";

import { AlertService } from "../../alert/alert.service";
import { ProfilService } from "./profil/profil.service";
import { UserService } from "./user.service";

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    UsersHomeComponent,
    UsersComponent,
    ProfilComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    AlertModule,
    ImageCropperModule,
    AngularMaterialModule
  ],
  providers: [
    ProfilService,
    UserService,
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ]
})
export class UsersModule { }
