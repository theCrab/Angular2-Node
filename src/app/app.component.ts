import { Component, OnInit } from '@angular/core';

import { ToastComponent } from './shared/toast/toast.component';
import { Router } from "@angular/router";

import { AuthService } from "./auth/auth.service";
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public toast: ToastComponent,
    private router: Router) { }

  ngOnInit() {
    // this.authService.isLoggedIn()
    //   .subscribe(
    //   data => {
    //     console.log('login Success!');
    //   },
    //   error => {
    //     this.router.navigateByUrl(environment.nonAuthenticationUrl);
    //     console.error(error)
    //   }
    //   );
  }
}
