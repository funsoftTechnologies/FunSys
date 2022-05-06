import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from "./articles.component";
import { ArticleDetailComponent } from "./detail/article-detail.component";
import { ArticleListComponent } from "./list/article-list.component";

import { AuthGuard } from "../../security/auth-guard";

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'article', component: ArticleDetailComponent },
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
export class ArticlesRoutingModule { }
