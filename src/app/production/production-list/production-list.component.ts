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

	constructor(private productionService: ProductionService,
		public toast: ToastComponent, ) { }

	currentPage = 1;
	itemsPerPage = 1;
	productions = [];

	ngOnInit() {
		this.productionService.get().subscribe(
			data => {
				this.productions = data;
			},
			error => console.log(error)
		);
	}
}