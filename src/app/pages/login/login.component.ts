import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private returnTo: string= '';

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.returnTo = params['returnUrl']);
  }

  onLogin() {
    if (this.auth.login()) {
      // this.router.navigateByUrl("/dash");
    }
  }
}
