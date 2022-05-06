import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from "./security/login/login.component";
import { RegisterComponent } from "./security/register/register.component";

const routes: Routes = [
  { path: 'login',      component: LoginComponent },
  { path: 'register',   component: RegisterComponent },
  { path: '',           redirectTo: 'home',pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,   {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

