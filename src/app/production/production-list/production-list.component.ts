import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ToastComponent } from './../../shared/toast/toast.component';
import { ProductionService } from './../production.service';
import { Production } from './../production.model';


@Component({
	selector: 'app-production-list',
	templateUrl: './production-list.component.html',
	styleUrls: ['./production-list.component.css']
})
export class ProductionListComponent implements OnInit {

	constructor(
		private _productionService: ProductionService,
		private _toast: ToastComponent, ) { }

	//Alan:此頁物件
	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;
	public productions = [];

	ngOnInit() {
		this._productionService.get().subscribe(
			data => {
				this.productions = data;
			},
			// error => //console.error(error);.log(error)
		);
	}
}