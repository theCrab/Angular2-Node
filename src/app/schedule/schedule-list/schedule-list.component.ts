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
		private scheduleService: ScheduleService,
		public toast: ToastComponent
	) { }

	currentPage = 1;
	itemsPerPage = 1;
	schedules = [];

	ngOnInit() {
		this.scheduleService.get().subscribe(
			data => {
				this.schedules = data;
			},
			error => console.log(error)
		);
	}


}