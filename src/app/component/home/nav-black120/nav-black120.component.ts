import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { MenuService } from "app/services/menu.service";
import { AuthService } from "app/services/auth.service";

import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";
import { AlertConfirmModel } from "app/shared/component/alert-confirm/alert-confirm.model";

import { environment } from "environments/environment";

import { Menu } from 'app/model/menu.model';

import TakeUntilDestroy from 'angular2-take-until-destroy';

@Component({
  selector: 'app-nav-black120',
  templateUrl: './nav-black120.component.html',
  styleUrls: ['./nav-black120.component.css']
})
@TakeUntilDestroy
export class NavBlack120Component implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _menuService: MenuService,
    private _alertConfirmService: AlertConfirmService) { }

  public mainPage = environment.mainPageUrl;

  public menus = [];

  ngOnInit() {
    this._menuService.get()
      .takeUntil((<any>this).componentDestroy())
      .subscribe(
      (menu: Menu[]) => {
        this.menus = menu;
      });
  }

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