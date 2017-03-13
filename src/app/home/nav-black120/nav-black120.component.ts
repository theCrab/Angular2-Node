import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-nav-black120',
  templateUrl: './nav-black120.component.html',
  styleUrls: ['./nav-black120.component.css']
})
export class NavBlack120Component {

  constructor(private authService: AuthService, private router: Router) { }

  private mainPage = environment.mainPageUrl;

  private menus = [
    {
      routerLink: ['run'],
      routerTitle: '執行排程',
      routerIcon: 'fa fa-home',
      routerLinkActive: 'w3-black'
    },
    {
      routerLink: ['sched'],
      routerTitle: '排程管理',
      routerIcon: 'fa fa-user',
      routerLinkActive: 'w3-black'
    },
    {
      routerLink: ['prod'],
      routerTitle: '產品管理',
      routerIcon: 'fa fa-eye',
      routerLinkActive: 'w3-black'
    },
    {
      routerLink: ['machine'],
      routerTitle: '設備管理',
      routerIcon: 'fa fa-envelope',
      routerLinkActive: 'w3-black'
    }
  ];

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl(environment.nonAuthenticationUrl);
  }
}