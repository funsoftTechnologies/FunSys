import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseUrl } from "../../shared/baseUrl";

import { Achat } from "./achat";
import { AuthService } from "../../security/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  url: string = BaseUrl.URL;

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getAll(): Observable<Achat[]> {
    return this._http.get<Achat[]>(this.url + '/achats', this._authService.getOptions());
  }

  post(achat: Achat): Observable<Achat> {
    return this._http.post<Achat>(this.url + '/achats', achat, this._authService.getOptions());
  }

  put(achat: Achat): Observable<Achat> {
    return this._http.put<Achat>(this.url + '/achats', achat, this._authService.getOptions());
  }

  delete(achat: Achat): Observable<String> {
    return this._http.delete<String>(this.url + '/achats/' + achat.id, this._authService.getOptions());
  }
}
