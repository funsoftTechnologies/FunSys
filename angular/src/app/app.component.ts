import {Component, OnInit} from '@angular/core';
import {SearchService} from "./api/header/search.service";
import {AuthService} from "./security/auth.service";
import {ThemeService} from "./api/header/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private searchService: SearchService, private authService: AuthService,
              private readonly themeService: ThemeService) {}

  ngOnInit() {
    // this.themeService.setTheme("deeppurple-amber");
  }
}
