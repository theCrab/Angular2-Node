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
		private deviceService: DeviceService,
		private toast: ToastComponent) { }

	//Alan:此頁物件
	private currentPage: Number = 1;
	private itemsPerPage: Number = 10;

	private devices: Device[];

	ngOnInit() {
		this.deviceService.get().subscribe(
			data => {
				this.devices = data;
				console.table(this.devices)
			},
			error => console.log(error)
		);
	}
}