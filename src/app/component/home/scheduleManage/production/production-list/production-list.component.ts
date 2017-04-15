import { Component, OnDestroy, OnInit } from '@angular/core';

import { Production } from 'app/model/production.model';

import TakeUntilDestroy from 'angular2-take-until-destroy';
import { popup } from "app/shared/animation/animation";
import { ProductionService } from "app/services/production.service";
@Component({
	selector: 'app-production-list',
	templateUrl: './production-list.component.html',
	styleUrls: ['./production-list.component.css'],
	animations: [
		popup()
	]
})
@TakeUntilDestroy
export class ProductionListComponent implements OnInit, OnDestroy {

	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;

	public productions: Production[] = [];

	public isLoading: boolean = true;

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
				this.isLoading = false;
				console.log('get data success!');
			},
			error => {
				console.error('get data fail!')
			});
	}

	ngOnDestroy(): void {
	}
}