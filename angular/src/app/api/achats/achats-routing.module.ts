import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AchatsComponent } from "./achats.component";
import { AchatDetailComponent } from "./detail/achat-detail.component";
import { AchatListComponent } from "./list/achat-list.component";

import { AuthGuard } from "../../security/auth-guard";


const routes: Routes = [
  {
    path: '',
    component: AchatsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'achat', component: AchatDetailComponent },
          { path: '', component: AchatListComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchatsRoutingModule { }
