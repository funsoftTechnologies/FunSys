import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from "../../shared/baseUrl";

import { Article } from './article';
import { AuthService } from "../../security/auth.service";

@Injectable()
export class ArticleService {

  url: string = BaseUrl.URL;

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getAll(): Observable<Article[]> {
    return this._http.get<Article[]>(this.url + '/articles', this._authService.getOptions());
  }

  post(article: Article): Observable<Article> {
    return this._http.post<Article>(this.url + '/articles', article, this._authService.getOptions());
  }

  put(article: Article): Observable<Article> {
      return this._http.put<Article>(this.url + '/articles', article, this._authService.getOptions());
  }

  delete(id: number): Observable<String> {
      return this._http.delete<String>(this.url + '/articles/' + id, this._authService.getOptions());
  }
}
