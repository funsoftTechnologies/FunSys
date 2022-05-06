import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrl } from "../shared/baseUrl";
import { Subject } from "rxjs";

@Injectable()
export class AuthService {

  url = BaseUrl.URL;
  isAuth : Subject<boolean> = new Subject<boolean>();

  constructor(private _http: HttpClient) { }

  register(registUser: any) {
    return this._http.post(this.url + '/register', registUser, { observe: 'response'});
  }

  login(loginUser: any) {
    return this._http.post(this.url + '/login', loginUser, { observe: 'response'});
  }

  logout() {
    this.isAuth.next(false);
    localStorage.clear();
  }

  getOptions() {
    return { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', JSON.parse(localStorage.getItem('jwtToken'))) }
  }

}









  // getOptions1() {
  //   if (localStorage.getItem('token')) {
  //     return {
  //       headers: new HttpHeaders()
  //         .set('AUTHORIZATION', 'Bearer ' + JSON.parse(localStorage.getItem('token')))
  //         .set('Content-Type', 'application/json')
  //         .set('responseType', 'arraybuffer')
  //         .set('observe', 'response')
  //     };
  //   }
  // }

  // getOptions2() {
  //   if (localStorage.getItem('token')) {
  //     return {
  //       headers: new HttpHeaders()
  //         .set('AUTHORIZATION', 'Bearer ' + JSON.parse(localStorage.getItem('token')))
  //         .set('Content-Type', 'application/json')
  //         .set('reportProgress', 'true')
  //         .set('responseType', 'text')
  //     };
  //   }
  // }
  //



