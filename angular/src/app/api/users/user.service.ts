import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { BaseUrl } from "../../shared/baseUrl";
import { Role } from "./role";
import { User } from "./user";
import { AuthService } from "../../security/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = BaseUrl.URL;

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getAllUser(): Observable<User[]> {
    return this._http.get<User[]>(this.url + '/users', this._authService.getOptions());
  }

  postUser(user: User) {
    return this._http.post(this.url + '/users', user, this._authService.getOptions());
  }

  getAllRole(): Observable<Role[]> {
    return this._http.get<Role[]>(this.url + '/roles', this._authService.getOptions());
  }

  postRole(role: Role) {
    return this._http.post(this.url + '/roles', role, this._authService.getOptions());
  }

}
