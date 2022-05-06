import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Route } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (localStorage.getItem('jwtToken')) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {

        if (localStorage.getItem('jwtToken')) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: null }});

        return false;
    }

}
