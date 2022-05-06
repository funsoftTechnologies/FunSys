import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "../../security/auth-guard";
import { AppareilsComponent } from "./appareils.component";

const routes: Routes = [
  { path: '',  component: AppareilsComponent,       canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppareilsRoutingModule { }
