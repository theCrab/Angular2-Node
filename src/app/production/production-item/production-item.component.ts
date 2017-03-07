import { Component, OnInit, Input } from '@angular/core';

import { ToastComponent } from './../../shared/toast/toast.component';
import { PopUpComponent } from './../../shared/popUp/popUp.component';

import { ProductionService } from './../production.service';
import { Production } from './../production.model';

@Component({
  selector: '[app-production-item]',
  templateUrl: './production-item.component.html',
  styleUrls: ['./production-item.component.css']
})
export class ProductionItemComponent implements OnInit {

  //ALan:要修改的物件
  @Input() item: Production;

  constructor(
    private productionService: ProductionService,
    public toast: ToastComponent,
    private popup: PopUpComponent) { }

  ngOnInit() { }

  onDelete(production: Production) {
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
  }

  switchEdit(production: Production) {
    this.productionService.switchEdit(production)
    this.popup.open(`修改設備－${production.name}`);
  }  
}