import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../security/auth-guard";
import { ApiComponent } from "./api.component";
import { HomeComponent } from "./home/home.component";
import { PanierComponent } from "./panier/panier.component";
import { HelloComponent } from "./date/hello.component";
import { TestComponent } from "./test/test.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { GrilleComponent } from "./grille/grille.component";
import { MatrixComponent } from "./matrix/matrix.component";

const apiRoutes: Routes = [
  { path: '',
    component: ApiComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users',      loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
      { path: 'achats',     loadChildren: () => import('./achats/achats.module').then(m => m.AchatsModule)},
      { path: 'articles',   loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)},
      { path: 'appareils',  loadChildren: () => import('./appareils/appareils.module').then(m => m.AppareilsModule)},
      { path: 'home',       component: HomeComponent,       canActivate: [AuthGuard]},
      { path: 'panier',     component: PanierComponent,     canActivate: [AuthGuard]},
      { path: 'hello',      component: HelloComponent ,     canActivate: [AuthGuard]},
      { path: 'test',       component: TestComponent ,      canActivate: [AuthGuard]},
      { path: 'grille',     component: GrilleComponent ,    canActivate: [AuthGuard]},
      { path: 'matrix',     component: MatrixComponent ,    canActivate: [AuthGuard]},

  // { path: 'appareil',   component: AppareilsComponent , canActivate: [AuthGuardService]}

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(apiRoutes)],
  exports: [RouterModule]
})
export class ApiRoutingModule { }
