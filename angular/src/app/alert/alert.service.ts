import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // // clear alert message on route change
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     if (this.keepAfterNavigationChange) {
    //       // only keep for a single location change
    //       this.keepAfterNavigationChange = false;
    //     } else {
    //       // clear alert
    //       this.subject.next();
    //     }
    //   }
    // });
  }

  success(message: string) {
    this.subject.next({ type: 'success', text: message });
    setTimeout(() => {
      this.subject.next();
    }, 2500);
  }

  error(message: string) {
    this.subject.next({ type: 'error', text: message });
    setTimeout(() => {
      this.subject.next();
    }, 2500);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
