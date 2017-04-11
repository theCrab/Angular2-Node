import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { DeviceService } from './../device.service';
import { Device } from './../device.model';

import { filterObject } from "app/shared/pipe/filter.model";

@Component({
	selector: 'app-device-list',
	templateUrl: './device-list.component.html',
	styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit, OnDestroy {

	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;

	public devices: Device[];
	private subscription$: Subscription;
	busy: Subscription;

	public filterObj: filterObject[] = [];

	constructor(private _deviceService: DeviceService) { }

	ngOnInit() {
		this.subscription$ = this._deviceService.devicesChanged
			.subscribe(
			(devices: Device[]) => {
				this.devices = devices;
			});

		this._deviceService.get()
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

	clear() {
		this.filterObj = [];
	}
}