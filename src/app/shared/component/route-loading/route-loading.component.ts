import { Component, Input, OnInit } from '@angular/core';

import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import { popup } from "app/shared/animation/animation";

import TakeUntilDestroy from 'angular2-take-until-destroy';
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
@TakeUntilDestroy
export class RouteLoadingComponent implements OnInit {

  // Sets initial value to true to show loading spinner on first load
  public loading: boolean = true;

  constructor(
    private _router: Router) {
  }
  ngOnInit() {
    this._router.events
      .takeUntil((<any>this).componentDestroy())
      .subscribe((event: RouterEvent) => {
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