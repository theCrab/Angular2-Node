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
		public _toast: ToastComponent
	) { }

	//Alan:此頁物件
	private currentPage: Number = 1;
	private itemsPerPage: Number = 10;
	schedules = [];

	ngOnInit() {
		this._scheduleService.get().subscribe(
			data => {
				this.schedules = data;
			},
			error => console.log(error)
		);
	}


}