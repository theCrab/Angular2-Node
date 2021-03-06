import { Component, OnInit } from '@angular/core';

import { ToastComponent } from "app/shared/component/toast/toast.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(public _toast: ToastComponent) { }

  //Alan:when app init check sessionStorage
  ngOnInit() {
    if (sessionStorage.getItem('token') == null) {
      sessionStorage.setItem('token', localStorage.getItem('token'));
      sessionStorage.setItem('userId', localStorage.getItem('userId'));
    }
  }

}
