import { Component, OnInit } from '@angular/core';

import { ProductionService } from './production.service';
import { PopUpComponent } from './../shared/popUp/popUp.component';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html'
})
export class ProductionComponent implements OnInit {

  constructor(
    private productionService: ProductionService ,
    private popup: PopUpComponent) { }

    public collection: any[] = [1,2,3,4,5,6,7];  

  ngOnInit() {
  }
  
  add() {
    this.popup.open('新增產品');
  }
 
 
  callBackFun(){
    this.productionService.clearEdit();
  }

}