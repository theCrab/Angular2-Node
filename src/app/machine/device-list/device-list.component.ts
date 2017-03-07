import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { ToastComponent } from './../../shared/toast/toast.component';
import { DeviceService } from './../device.service';
import { Device } from './../device.model';

@Component({
	selector: 'app-device-list',
	// animations: [, trigger, state, style, transition, animate
	// 	trigger('flyInOut', [
	// 		state('in', style({ opacity: 1, transform: 'translateX(0)' })),
	// 		transition('void => *', [
	// 			style({
	// 				opacity: 0,
	// 				transform: 'translateX(-100%)'
	// 			}),
	// 			animate('0.2s ease-in')
	// 		]),
	// 		transition('* => void', [
	// 			animate('0.2s 10 ease-out', style({
	// 				opacity: 0,
	// 				transform: 'translateX(100%)'
	// 			}))
	// 		])
	// 	])
	// ],
	templateUrl: './device-list.component.html',
	styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

	constructor(private deviceService: DeviceService,
		private toast: ToastComponent ) { }

	//Alan:此頁物件
	currentPage = 1;
	itemsPerPage = 1;
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