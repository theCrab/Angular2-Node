import { Component, OnDestroy, OnInit } from '@angular/core';

import { ProductionService } from './../production.service';
import { Production } from 'app/model/production.model';

import TakeUntilDestroy from 'angular2-take-until-destroy';
@Component({
	selector: 'app-production-list',
	templateUrl: './production-list.component.html',
	styleUrls: ['./production-list.component.css']
})
@TakeUntilDestroy
export class ProductionListComponent implements OnInit, OnDestroy {

	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;

	public productions: Production[] = [];

	constructor(private _productionService: ProductionService) { }

	ngOnInit() {
		this._productionService.productionsChanged
			.takeUntil((<any>this).componentDestroy())
			.subscribe(
			(productions: Production[]) => {
				this.productions = productions;
			});

		this._productionService.get()
			.takeUntil((<any>this).componentDestroy())
			.subscribe(
			(data) => {
				console.log('get data success!');
			},
			error => {
				console.error('get data fail!')
			});
	}

	ngOnDestroy(): void {
	}
}