import { Component, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { ProductionService } from './../production.service';
import { Production } from './../production.model';


@Component({
	selector: 'app-production-list',
	templateUrl: './production-list.component.html',
	styleUrls: ['./production-list.component.css']
})
export class ProductionListComponent implements OnDestroy {

	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;

	public productions:Production[] = [];
	private subscription$: Subscription;

	constructor(
		private _productionService: ProductionService) {

		this.subscription$ = this._productionService.productionsChanged
			.subscribe(
			(productions: Production[]) => {
				this.productions = productions;
			});

		this._productionService.get()
			.subscribe(
			(data) => {
				console.log('get data success!');
			},
			error => {
				console.error('get data fail!')
			});
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
	}
}