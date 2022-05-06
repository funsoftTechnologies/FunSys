import { Component } from '@angular/core';
import { AuthService } from "../../security/auth.service";
import {HttpClient} from "@angular/common/http";
import {SearchService } from "../header/search.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  input!: string;
  jwtToken = '';
  ipAddress: string;
  currentDate: any;
  urlWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Toulouse,fr&units=metric&appid=5e8a8efa812b3f68e626a19c29b99a57';
  weather: any;
  time: Date;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private searchService: SearchService) {
    this.searchService.searchArticle$.subscribe(event =>
      this.applySearch(event))

    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.currentDate = new Date();
    this.authService.isAuth.next(true);
    this.jwtToken = JSON.parse(localStorage.getItem('jwtToken'))


    // this.http.get(this.urlWeather).subscribe(value => {
    //   console.log(this.weather = value);
    // });
    //
    // this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
    //   this.ipAddress = res.ip;
    // });
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    //
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}
