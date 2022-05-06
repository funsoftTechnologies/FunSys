import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from "../../shared/baseUrl";

import { Appareil } from "./appareil/appareil";
import { AuthService } from "../../security/auth.service";

@Injectable()
export class AppareilService {

  url: string = BaseUrl.URL + '/appareils';

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getAll(): Observable<Appareil[]> {
    return this._http.get<Appareil[]>(this.url, this._authService.getOptions());
  }

  post(appareil: Appareil): Observable<Appareil> {
    return this._http.post<Appareil>(this.url, appareil, this._authService.getOptions());
  }

  put(appareil: Appareil): Observable<Appareil> {
      return this._http.put<Appareil>(this.url, appareil, this._authService.getOptions());
  }

  delete(id: number): Observable<String> {
      return this._http.delete<String>(this.url + '/' + id, this._authService.getOptions());
  }
}
