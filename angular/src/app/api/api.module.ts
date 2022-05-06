import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { AngularMaterialModule } from "../angular-material.module";
import { ApiRoutingModule } from "./api-routing.module";

import { UsersModule } from "./users/users.module";
import { ArticlesModule } from "./articles/articles.module";
import { AchatsModule } from "./achats/achats.module";
import { AppareilsModule } from "./appareils/appareils.module";
import { AlertModule } from "../alert/alert.module";

import { ApiComponent } from "./api.component";
import { HeaderComponent } from "./header/header.component";
import { PanierComponent } from "./panier/panier.component";
import { HomeComponent } from "./home/home.component";

import { TestComponent } from "./test/test.component";
import { HelloComponent } from "./date/hello.component";

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AuthService } from "../security/auth.service";
import { AuthGuard } from "../security/auth-guard";
import { PanierService } from "./panier/panier.service";
import { ThemeService } from "./header/theme.service";
import { StyleManagerService } from "./header/style-manager.service";
import { MenuComponent } from './header/menu/menu.component';
import { GrilleComponent } from './grille/grille.component';
import { MatrixComponent } from './matrix/matrix.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    ApiComponent,
    HeaderComponent,
    PanierComponent,
    TestComponent,
    HomeComponent,
    HeaderComponent,
    HelloComponent,
    MenuComponent,
    GrilleComponent,
    MatrixComponent
  ],
  imports: [
    CommonModule,
    ApiRoutingModule,
    FormsModule,
    AngularMaterialModule,
    UsersModule,
    ArticlesModule,
    AchatsModule,
    AppareilsModule,
    AlertModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    PanierService,
    ThemeService,
    StyleManagerService,
    {provide: LOCALE_ID, useValue: 'fr-FR'}]
})
export class ApiModule { }
