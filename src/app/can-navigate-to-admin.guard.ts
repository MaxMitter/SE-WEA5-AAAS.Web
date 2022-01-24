import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./shared/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {
  constructor(protected router: Router, protected auth: AuthenticationService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return (async () => {
      // wait a bit for the tokens to be set, otherwise redirect to dashboard won't work
      await new Promise(f => setTimeout(f, 200));
      if (!this.auth.isLoggedIn()) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    })();
  }
}
