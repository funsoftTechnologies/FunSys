import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Observable } from "rxjs";

import { SearchService } from "./search.service";
import { AuthService } from "../../security/auth.service";
import { ThemeService } from "./theme.service";
import { Option } from "./option.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

  input;
  userName: string;
  title = 'Funsoft Technologie';

  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

  @Output() sidenav: EventEmitter<string> = new EventEmitter<string>();

  constructor(private searchService: SearchService, private authService: AuthService,
              private readonly themeService: ThemeService) {

    // sessionStorage.
    this.authService.isAuth.subscribe(isAuth => {
      if(isAuth)
        this.userName = JSON.parse(localStorage.getItem('userName'));
      else this.userName= null;
    });

    if(localStorage.getItem('userName'))
      this.userName = JSON.parse(localStorage.getItem('userName'));
  }


  ngOnInit() {
    // this.themeService.setTheme("deeppurple-amber");
  }

  themeChangeHandler(themeToSet) {
    this.themeService.setTheme(themeToSet);
  }

  applyFilter($event: Event) {
    this.searchService.searchArticle($event);
  }

  sidenaToggle() {
    this.sidenav.emit();
  }
}

