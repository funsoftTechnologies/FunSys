import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

import { Message } from "./message";
import { Article } from "../articles/article";
import { AuthService } from "../../security/auth.service";
import { BaseUrl } from "../../shared/baseUrl";

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent {

  me = new Message();
  date!: Date | null;
  url = BaseUrl.URL;

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  show(date: MatDatepickerInputEvent<Date | null>) {
    this.date = date.value;
    this._http.post<Article>(this.url +'/tests/date', this.date, this._authService.getOptions()).subscribe(value => console.log(value));
  }

  sayHello() {
      this._http.get(this.url +'/hello', this._authService.getOptions()).subscribe((message: Message)  =>  {
      this.me = message;
    });
  }
}
