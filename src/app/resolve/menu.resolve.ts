import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { MenuService } from "app/services/menu.service";
import { Menu } from 'app/model/menu.model';
@Injectable()
export class MenuResolve implements Resolve<Menu> {

  constructor(private _menuService: MenuService) { }

  resolve(route: ActivatedRouteSnapshot){
    return this._menuService.get();
  }
}