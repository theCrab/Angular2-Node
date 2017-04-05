import { Component, Input } from '@angular/core';

import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import { popup } from "../../animation/animation";

//Alan:the reference:
//http://stackoverflow.com/questions/37069609/show-loading-screen-when-navigating-between-routes-in-angular-2
@Component({
  selector: 'app-route-loading',
  templateUrl: './route-loading.component.html',
  styleUrls: ['./route-loading.component.css'],
  animations: [
    popup(0, 300)
  ]
})
export class RouteLoadingComponent {

  // Sets initial value to true to show loading spinner on first load
  loading: boolean = true;

  constructor(
    private _router: Router) {
    _router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      // this timeout is to see the animation,
      // this.timeOutLoading(100);
      // you can use this for general
       this.loading = false;

    }
  }

  // private timeOutLoading(time: number) {
  //   setTimeout(() => {
  //     this.loading = false;
  //   }, time);
  // }
}