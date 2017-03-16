import { Component, OnInit } from '@angular/core';

import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(public toast: ToastComponent) { }

  ngOnInit() { }

}
