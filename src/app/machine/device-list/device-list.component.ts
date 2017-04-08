import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { ToastComponent } from './../../shared/toast/toast.component';
import { DeviceService } from './../device.service';
import { Device } from './../device.model';

import { filterObject } from './../../lib/pipe/filter.model';
import { Subscription } from "rxjs/Subscription";
@Component({
	selector: 'app-device-list',
	templateUrl: './device-list.component.html',
	styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnDestroy {

	//Alan:此頁物件
	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;

	public devices: Device[];
	private subscription$: Subscription;

	public filterObj: filterObject[] = [];

	constructor(
		private _deviceService: DeviceService,
		private _toast: ToastComponent) {

		//Alan:訂閱Service裡面的參數
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