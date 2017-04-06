import { Component, OnInit } from '@angular/core';

import { ToastComponent } from './../../shared/toast/toast.component';


import { ScheduleService } from './../schedule.service';
import { Schedule } from './../schedule.model';

@Component({
	selector: 'app-schedule-list',
	templateUrl: './schedule-list.component.html',
	styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

	constructor(
		private _scheduleService: ScheduleService,
		private _toast: ToastComponent
	) { }

	//Alan:此頁物件
	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;
	public schedules = [];

	ngOnInit() {
		this._scheduleService.get().subscribe(
			data => {
				this.schedules = data;
			},
			// error => //console.error(error);.log(error)
		);
	}


}