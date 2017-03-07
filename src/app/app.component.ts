import { Component } from '@angular/core';

import { ToastComponent } from './shared/toast/toast.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public toast: ToastComponent) { }
}
