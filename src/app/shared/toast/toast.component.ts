import { Subscription } from 'rxjs/Subscription';
import { Component, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  @Input() message = { body: '', type: '' };

  timmer: Subscription;

  setMessage(body, type, time = 3000) {
    this.message.body = body;
    this.message.type = type;

    this.timmer = Observable.timer(time).subscribe(() => {
      close();
    });
  }

  close() {
    this.message.body = '';
    console.log('close toast');
  }

}
