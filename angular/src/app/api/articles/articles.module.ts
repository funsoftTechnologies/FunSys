import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AlertModule } from "../../alert/alert.module";
import { AngularMaterialModule } from "../../angular-material.module";

import { ArticlesRoutingModule } from "./articles-routing.module";
import { ArticlesComponent } from "./articles.component";
import { ArticleListComponent } from "./list/article-list.component";
import { ArticleDetailComponent } from "./detail/article-detail.component";

import { ArticleService } from "./article.service";
import { AlertService } from "../../alert/alert.service";

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleDetailComponent,
    ArticleListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    ArticlesRoutingModule,
    AngularMaterialModule
  ],
  providers: [
    AlertService,
    ArticleService,
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ]
})
export class ArticlesModule { }
