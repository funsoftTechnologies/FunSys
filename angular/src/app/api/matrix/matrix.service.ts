import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseUrl } from "../../shared/baseUrl";

import { AuthService } from "../../security/auth.service";

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  url: string = BaseUrl.URL;
  matrix = new Subject();

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  postMatrix(matrix: any[]): Observable<any[][]> {
    return this._http.post<any[][]>(this.url + '/matrix',matrix, this._authService.getOptions());
  }

}
