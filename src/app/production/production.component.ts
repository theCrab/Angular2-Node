import { Component } from '@angular/core';

import { ProductionService } from './production.service';
import { PopUpComponent } from './../shared/popUp/popUp.component';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html'
})
export class ProductionComponent  {

  constructor(
    private productionService: ProductionService,
    private popup: PopUpComponent) { }

  add() {
    this.popup.open('新增產品');
  }


  callBackFun() {
    this.productionService.clearEdit();
  }

}