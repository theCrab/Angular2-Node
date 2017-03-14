import { Component, OnInit } from '@angular/core';

import { ToastComponent } from './shared/toast/toast.component';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    public toast: ToastComponent,
    private router: Router) { }

  ngOnInit() { }

}
