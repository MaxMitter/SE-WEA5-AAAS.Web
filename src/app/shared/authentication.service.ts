import { Injectable } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private oAuthService: OAuthService) { }

  subject = new BehaviorSubject(false);

  login() {
    this.oAuthService.initCodeFlow();
    return true;
  }

  isLoggedIn() {
    console.log(`logged in? ${this.oAuthService.hasValidAccessToken()} && ${this.oAuthService.hasValidIdToken()}`)
    return this.oAuthService.hasValidAccessToken() && this.oAuthService.hasValidIdToken();
  }
}
