import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { ScheduleService } from './../schedule.service';
import { Schedule } from "app/model/schedule.model";

import TakeUntilDestroy from "angular2-take-until-destroy";

@Component({
	selector: 'app-schedule-list',
	templateUrl: './schedule-list.component.html',
	styleUrls: ['./schedule-list.component.css']
})
@TakeUntilDestroy
export class ScheduleListComponent implements OnInit, OnDestroy {

	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;

	public schedules: Schedule[] = [];
	private subscription$: Subscription;
	private subscription$2: Subscription;

	constructor(private _scheduleService: ScheduleService) { }

	ngOnInit() {
		this._scheduleService.schedulesChanged
			.takeUntil((<any>this).componentDestroy())
			.subscribe(
			(schedules: Schedule[]) => {
				this.schedules = schedules;
			});

		this._scheduleService.get()
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
		console.log(123);
	}
}