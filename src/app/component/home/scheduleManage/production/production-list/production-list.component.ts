import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { ProductionService } from './../production.service';
import { Production } from './../production.model';


@Component({
	selector: 'app-production-list',
	templateUrl: './production-list.component.html',
	styleUrls: ['./production-list.component.css']
})
export class ProductionListComponent implements OnInit,OnDestroy {

	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;

	public productions: Production[] = [];
	private subscription$: Subscription;

	constructor(private _productionService: ProductionService) { }

	ngOnInit() {
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