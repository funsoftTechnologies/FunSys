import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from "../../shared/baseUrl";
import { Article} from "../articles/article";
import { AuthService } from "../../security/auth.service";

@Injectable({
  providedIn: 'root'
})export class HomeService {

  url: string = BaseUrl.URL;
  urlWeather = 'https://api.openweathermap.org/data/2.5/weather?q={Toulouse}&appid={5e8a8efa812b3f68e626a19c29b99a57';

  constructor(private _http: HttpClient, private _authService: AuthService) {  }

  get() {
    return this._http.get(this.urlWeather);
  }

  // post(article: Article): Observable<Article> {
  //   return this._http.post<Article>(this.url + '/articles', article, this._authService.getOptions());
  // }
  //
  // put(article: Article): Observable<Article> {
  //     return this._http.put<Article>(this.url + '/articles', article, this._authService.getOptions());
  // }
  //
  // delete(id: number): Observable<String> {
  //     return this._http.delete<String>(this.url + '/articles/' + id, this._authService.getOptions());
  // }

}
