import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from "../../shared/baseUrl";

import { Medication } from "./medication";
import { AuthService } from "../../security/auth.service";

@Injectable()
export class MedicationService {

  url: string = BaseUrl.URL;

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getAll(): Observable<Medication[]> {
    return this._http.get<Medication[]>(this.url + '/medications', this._authService.getOptions());
  }

  post(medication: Medication): Observable<Medication> {
    return this._http.post<Medication>(this.url + '/medications', medication, this._authService.getOptions());
  }

  put(medication: Medication): Observable<Medication> {
      return this._http.put<Medication>(this.url + '/medications', medication, this._authService.getOptions());
  }

  delete(id: number): Observable<String> {
      return this._http.delete<String>(this.url + '/medications/' + id, this._authService.getOptions());
  }
}
