import { Component, OnDestroy, OnInit } from '@angular/core';

import { DeviceService } from './../device.service';
import { Device } from 'app/model/device.model';

import { filterObject } from "app/shared/pipe/filter.model";

import TakeUntilDestroy from 'angular2-take-until-destroy';
@Component({
	selector: 'app-device-list',
	templateUrl: './device-list.component.html',
	styleUrls: ['./device-list.component.css']
})
@TakeUntilDestroy
export class DeviceListComponent implements OnInit, OnDestroy {

	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;

	public devices: Device[];

	public filterObj: filterObject[] = [];

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