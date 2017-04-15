import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { Schedule } from "app/model/schedule.model";

import TakeUntilDestroy from "angular2-take-until-destroy";
import { popup } from "app/shared/animation/animation";
import { ScheduleService } from "app/services/schedule.service";

@Component({
	selector: 'app-schedule-list',
	templateUrl: './schedule-list.component.html',
	styleUrls: ['./schedule-list.component.css'],
	animations: [
		popup()
	]
})
@TakeUntilDestroy
export class ScheduleListComponent implements OnInit, OnDestroy {

	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;

	public schedules: Schedule[] = [];

	public isLoading: boolean = true;

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
				this.isLoading = false;
				console.log('get data success!');
			},
			error => {
				console.error('get data fail!')
			});
			
		this._scheduleService.isLoading
			.subscribe(
			(state: boolean) => {
				this.isLoading = state;
			});
	}

	ngOnDestroy(): void {
		// console.log(123);
	}
}