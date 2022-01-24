import {AfterViewChecked, Component} from '@angular/core';
import 'bootstrap';
import * as $ from "jquery";
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "./auth.config";
import {AuthenticationService} from "./shared/authentication.service";
import {JwksValidationHandler} from "angular-oauth2-oidc-jwks";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AAAS';
  public analysisIsCollapsed = true;
  isLoggedIn: boolean = false;

  constructor(private oauthService: OAuthService, protected auth: AuthenticationService, protected router: Router) {
    this.configureWithNewConfigApi();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.tryLogin().then(r => {
      this.isLoggedIn = this.auth.isLoggedIn();
    });
  }
}
