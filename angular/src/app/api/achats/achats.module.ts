import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AlertModule } from "../../alert/alert.module";
import { AngularMaterialModule } from "../../angular-material.module";

import { AchatsRoutingModule } from "./achats-routing.module";
import { AchatListComponent } from "./list/achat-list.component";
import { AchatDetailComponent } from "./detail/achat-detail.component";
import { AchatsComponent } from "./achats.component";

import { AlertService } from "../../alert/alert.service";
import { AchatService } from "./achat.service";

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AchatsComponent,
    AchatDetailComponent,
    AchatListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    AchatsRoutingModule,
    AngularMaterialModule
  ],
  providers: [
    AlertService,
    AchatService,
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ]
})
export class AchatsModule { }
