import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { ToastComponent } from './../../shared/toast/toast.component';
import { DeviceService } from './../device.service';
import { Device } from './../device.model';

@Component({
	selector: 'app-device-list',
	templateUrl: './device-list.component.html',
	styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

	constructor(
		private _deviceService: DeviceService,
		private _toast: ToastComponent) { }

	//Alan:此頁物件
	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;

	public devices: Device[];

	ngOnInit() {
		this._deviceService.get().subscribe(
			data => {
				this.devices = data;
				//console.error(error);.table(this.devices)
			},
			// error => console.log(error)
		);
	}
}