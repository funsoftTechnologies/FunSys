import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // Observable string sources
  private searchArticleSource = new Subject<Event>();

  constructor() { }

  // Observable string streams
  searchArticle$ = this.searchArticleSource.asObservable();

  // Service message commands
  searchArticle(event: Event) {
    this.searchArticleSource.next(event);
  }

}
