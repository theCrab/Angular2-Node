import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "app/services/auth.service";

import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";
import { AlertConfirmModel } from "app/shared/component/alert-confirm/alert-confirm.model";

import { environment } from "environments/environment";

import { Menu } from 'app/model/menu.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _alertConfirmService: AlertConfirmService) { }

  public menus = [];

  ngOnInit() {
    this.menus = this._activatedRoute.snapshot.data['menuList'];
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