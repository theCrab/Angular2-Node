import { Component, OnInit } from '@angular/core';

import { ToastComponent } from './shared/toast/toast.component';
import { Router } from "@angular/router";

import { AuthService } from "./auth/auth.service";
import { environment } from "../environments/environment";
import { AlertConfirmService } from "./shared/alert-confirm/alert-confirm.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public toast: ToastComponent,
    private router: Router,
    private alertConfirmService: AlertConfirmService) { }

  ngOnInit() { }

  testAlertPopup(): void {
    console.log("Opening alert");
    this.alertConfirmService.alert("Yo! something just happened")
      .ok(() => {
        console.log("alert closed");
      });
  }

  testConfirmPopup(): void {
    console.log("Opening confirm dialog");
    this.alertConfirmService.confirm("Are you really sure?")
      .ok(() => {
        console.log("OK");
      })
      .cancel(() => {
        console.log("CANCEL");
      });
  }
}
