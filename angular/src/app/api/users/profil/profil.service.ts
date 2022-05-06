import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from "../../../shared/baseUrl";

import { User } from "../user";
import { AuthService } from "../../../security/auth.service";

@Injectable({
  providedIn: 'root'
})

export class ProfilService {

  url = BaseUrl.URL + '/profil';
  jwt = this.authService.getOptions();
  constructor(private http: HttpClient, private authService: AuthService) { }


  getProfilByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.url + '/'+ username, this.authService.getOptions()); }


  getProfilPhoto(photoname: string) {
    return this.http.get(this.url + '/photo/byte/'+ photoname, { responseType: 'text' }); }


  updateProfil(file: any, filename: string, id: number): Observable<HttpEvent<{}>>  {

    // this.http.patch(this.url + '/' + id + '/' + filename, this.authService.getOptions())
    //   .subscribe(value => console.log(value));

    const formData: FormData = new FormData();
    formData.append('file', file, filename);

    const req = new HttpRequest('POST', this.url + '/photo', formData, { responseType: 'text' });
    return this.http.request(req);
  }

  patchUsername(id: number, username: string) {
    this.http.patch(this.url + '/' + id + '/' + username, this.authService.getOptions())
      .subscribe((value: User) => {
        localStorage.setItem('userName', JSON.stringify(value.username));
        console.log(value)
      });
  }



  saveImage(file: File, user: User): Observable<HttpEvent<{}>>  {
    user.photoname = file.name;
    console.log(user);
    this.http.patch<User>(this.url + '/funnote/contacts/' + user.id, user.photoname, this.jwt)
      .subscribe(value => console.log(value));

    console.log(file);
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const req = new HttpRequest('POST', this.url + '/funident/images/saveToDisk', formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    console.log(file);
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const req = new HttpRequest('POST', this.url + '/funident/images', formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  // getFiles(): Observable<any> {
  //   return this.http.get(this.url + '/funident/images');
  // }

  getFiles(): Observable<ArrayBuffer> {
    return this.http.get(this.url + '/funident/images/test', {
      responseType: 'arraybuffer'
    });
  }

  /*** Recupere tous les id ***/
  fetchAllImageIds(): Observable<any> {
    return this.http.get(this.url + '/funident/images');
  }

  /*** Recupere toutes les images grace aux id ***/
  getFile(id): Observable<any> {
    return this.http.get(this.url + '/funident/images/' + id, {responseType: 'arraybuffer', observe: 'response'});
      // .pipe(
      // tap((response: HttpResponse<any>) => {
      //   console.log('header', response.headers.get('filename'));
      //   console.log('body', response.body);
      // })
    // );
  }

  fetchAllImage(): Observable<any> {
    return this.http.get(this.url + '/funident/images/all', {responseType: 'arraybuffer', observe: 'response'});
  }
}

