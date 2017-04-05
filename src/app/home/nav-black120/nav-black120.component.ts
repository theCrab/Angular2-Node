import { AlertConfirmModel } from './../../shared/alert-confirm/alert-confirm.model';
import { AlertConfirmService } from './../../shared/alert-confirm/alert-confirm.service';
import { Component, ElementRef } from '@angular/core';
import { Router } from "@angular/router";

import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-nav-black120',
  templateUrl: './nav-black120.component.html',
  styleUrls: ['./nav-black120.component.css']
})
export class NavBlack120Component {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _alertConfirmService: AlertConfirmService) { }

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
    this._alertConfirmService.confirm(new AlertConfirmModel("登出", "確定要登出嗎？"))
      .ok(() => {
        this._authService.logout();
        this._router.navigateByUrl(environment.nonAuthenticationUrl);
      });
  }

  toggle(elem) {
    if (window.innerWidth <= 768) {
      elem.click();
    }
  }
}