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

  constructor(
    private productionService: ProductionService,
    public toast: ToastComponent,
    private popup: PopUpComponent,
    private alertConfirmService: AlertConfirmService) { }

  switchEdit(production: Production) {
    this.productionService.switchEdit(production)
    this.popup.open(`修改設備－${production.name}`);
  }

  onDelete(production: Production) {

    this.alertConfirmService.confirm(new AlertConfirmModel("刪除", "確定要刪除嗎？"))
      .ok(() => {
        this.productionService.delete(production)
          .subscribe(
          data => {
            this.toast.setMessage('產品刪除成功.', 'success');
            console.log(data)
          },
          error => {
            this.toast.setMessage(error, 'warning');
            console.error(error)
          }
          );
      });
  }
}