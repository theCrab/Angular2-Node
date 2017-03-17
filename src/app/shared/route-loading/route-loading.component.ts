import { Component, Input } from '@angular/core';
import { popup } from "../../animation/animation";
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";

//Alan:the reference:
//http://stackoverflow.com/questions/37069609/show-loading-screen-when-navigating-between-routes-in-angular-2
@Component({
  selector: 'app-route-loading',
  templateUrl: './route-loading.component.html',
  styleUrls: ['./route-loading.component.css', '../popUp/popUp.component.css'],
  animations: [
    popup(0, 300)
  ]
})
export class RouteLoadingComponent {

  // Sets initial value to true to show loading spinner on first load
  loading: boolean = true;

  constructor(
    private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    else if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    else if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    else if (event instanceof NavigationError) {
      this.loading = false;
    }
    // console.log(this.loading);
  }
}