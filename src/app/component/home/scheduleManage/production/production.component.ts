import { Component } from '@angular/core';

import { ProductionService } from './production.service';
import { PopUpComponent } from "app/shared/component/popUp/popUp.component";

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html'
})
export class ProductionComponent  {

  constructor(
    private _productionService: ProductionService,
    public _popup: PopUpComponent) { }

  add() {
    this._popup.open('新增產品');
  }


  callBackFun() {
    this._productionService.clearEdit();
  }

}