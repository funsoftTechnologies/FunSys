import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicationsComponent } from "./medications.component";
import { MedicationDetailComponent } from "./detail/medication-detail.component";
import { ArticleListComponent } from "./list/article-list.component";

import { AuthGuard } from "../../security/auth-guard";

const routes: Routes = [
  {
    path: '',
    component: MedicationsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'article', component: MedicationDetailComponent },
          { path: '', component: ArticleListComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicationsRoutingModule { }
