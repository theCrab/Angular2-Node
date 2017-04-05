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
		public _toast: ToastComponent, ) { }

	//Alan:此頁物件
	private currentPage: Number = 1;
	private itemsPerPage: Number = 10;
	productions = [];

	ngOnInit() {
		this._productionService.get().subscribe(
			data => {
				this.productions = data;
			},
			// error => //console.error(error);.log(error)
		);
	}
}