import { Component, Input } from '@angular/core';

import { ToastComponent } from './../../shared/toast/toast.component';
import { PopUpComponent } from './../../shared/popUp/popUp.component';

import { ProductionService } from './../production.service';
import { Production } from './../production.model';

import { AlertConfirmService } from "../../shared/alert-confirm/alert-confirm.service";
import { AlertConfirmModel } from "../../shared/alert-confirm/alert-confirm.model";

@Component({
  selector: '[app-production-item]',
  templateUrl: './production-item.component.html',
  styleUrls: ['./production-item.component.css']
})
export class ProductionItemComponent {

  //ALan:要修改的物件
  @Input('app-production-item') item: Production;
  @Input('index') index: number;

  constructor(
    private _productionService: ProductionService,
    private _toast: ToastComponent,
    private _popup: PopUpComponent,
    private _alertConfirmService: AlertConfirmService) { }

  switchEdit(production: Production) {
    this._productionService.switchEdit(this.index, production)
    this._popup.open(`修改設備－${production.name}`);
  }

  onDelete(production: Production) {

    this._alertConfirmService.confirm(new AlertConfirmModel("刪除", "確定要刪除嗎？"))
      .ok(() => {
        this._productionService.delete(this.index, production)
          .subscribe(
          data => {
            this._toast.setMessage('產品刪除成功.', 'success');
            //console.error(error);.log(data)
          },
          error => {
            this._toast.setMessage(error, 'warning');
            //console.error(error);.error(error)
          }
          );
      });
  }
}