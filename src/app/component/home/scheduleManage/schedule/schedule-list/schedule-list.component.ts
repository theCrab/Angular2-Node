import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { ScheduleService } from './../schedule.service';
import { Schedule } from "app/model/schedule.model";

@Component({
	selector: 'app-schedule-list',
	templateUrl: './schedule-list.component.html',
	styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit, OnDestroy {

	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;

	public schedules: Schedule[] = [];
	private subscription$: Subscription;

	constructor(private _scheduleService: ScheduleService) { }

	ngOnInit() {
		this.subscription$ = this._scheduleService.schedulesChanged
			.subscribe(
			(schedules: Schedule[]) => {
				this.schedules = schedules;
			});

		this._scheduleService.get()
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
}