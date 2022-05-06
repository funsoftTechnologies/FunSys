import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppareilsRoutingModule } from './appareils-routing.module';
import { AppareilDialog, AppareilsComponent} from './appareils.component';
import { AppareilComponent } from "./appareil/appareil.component";
import { FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../../angular-material.module";
import { AppareilService } from "./appareil.service";
import { AlertService } from "../../alert/alert.service";
import { AlertModule } from "../../alert/alert.module";

@NgModule({
  declarations: [
    AppareilsComponent,
    AppareilComponent,
    AppareilDialog
  ],
  imports: [
    CommonModule,
    AppareilsRoutingModule,
    FormsModule,
    AngularMaterialModule,
    AlertModule
  ],
  providers: [
    AppareilService,
    AlertService
  ],
})
export class AppareilsModule { }
