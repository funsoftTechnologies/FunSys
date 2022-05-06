import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilComponent} from "./profil/profil.component";
import { UsersComponent} from "./users.component";
import { UsersHomeComponent } from "./users-home.component";

import { AuthGuard } from "../../security/auth-guard";


const usersRoutes: Routes = [
  {
    path: '',
    component: UsersHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {path: 'profil', component: ProfilComponent},
          {path: '', component: UsersComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
