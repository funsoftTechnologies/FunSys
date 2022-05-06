import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AlertModule } from "../../alert/alert.module";
import { AngularMaterialModule } from "../../angular-material.module";

import { MedicationsRoutingModule } from "./medications-routing.module";
import { MedicationsComponent } from "./medications.component";
import { ArticleListComponent } from "./list/article-list.component";
import { MedicationDetailComponent } from "./detail/medication-detail.component";

import { MedicationService } from "./medication.service";
import { AlertService } from "../../alert/alert.service";

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    MedicationsComponent,
    MedicationDetailComponent,
    ArticleListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    MedicationsRoutingModule,
    AngularMaterialModule
  ],
  providers: [
    AlertService,
    MedicationService,
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ]
})
export class MedicationsModule { }
