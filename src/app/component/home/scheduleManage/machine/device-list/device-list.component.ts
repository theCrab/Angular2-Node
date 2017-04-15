import { Subject } from 'rxjs/Subject';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Device } from 'app/model/device.model';

import { filterObject } from "app/shared/pipe/filter.model";

import TakeUntilDestroy from 'angular2-take-until-destroy';
import { Subscription } from "rxjs/Subscription";
import { popup } from "app/shared/animation/animation";
import { DeviceService } from "app/services/device.service";
@Component({
	selector: 'app-device-list',
	templateUrl: './device-list.component.html',
	styleUrls: ['./device-list.component.css'],
	animations: [
		popup()
	]
})
@TakeUntilDestroy
export class DeviceListComponent implements OnInit, OnDestroy {

	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;

	public devices: Device[];

	public filterObj: filterObject[] = [];

	public isLoading: boolean = true;

	constructor(private _deviceService: DeviceService) { }

	ngOnInit() {
		this._deviceService.devicesChanged
			.takeUntil((<any>this).componentDestroy())
			.subscribe(
			(devices: Device[]) => {
				this.devices = devices;
			});

		this._deviceService.get()
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

	clear() {
		this.filterObj = [];
	}
}