import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastComponent } from "app/shared/component/toast/toast.component";
import { ScheduleService } from "app/services/schedule.service";

import { Schedule } from 'app/model/schedule.model';

import TakeUntilDestroy from "angular2-take-until-destroy";

@Component({
	selector: 'app-runschedule-input',
	templateUrl: './runschedule-input.component.html',
	styleUrls: ['./runschedule-input.component.css']
})
@TakeUntilDestroy
export class RunscheduleInputComponent implements OnInit {

	public schedules = [];
	public myForm: FormGroup;
	public submitted: boolean = false;

	constructor(
		private _scheduleService: ScheduleService,
		private _toast: ToastComponent) { }

	ngOnInit() {
		this.myForm = new FormGroup({
			schedule_id: new FormControl(null, Validators.required),
		});

	}

	onSubmit() {
		this.submitted = true;
		if (this.myForm.valid) {
			// console.log(this.myForm);
			let schedule = new Schedule(
				this.myForm.value.scheduleDate,
				this.myForm.value.production,
				this.myForm.value.device,
				this.myForm.value.creator,
				this.myForm.value.createData,
				this.myForm.value.schedule_id,
			);
			this._scheduleService.search(schedule)
				.takeUntil((<any>this).componentDestroy())
				.subscribe(
				data => {
					this._toast.setMessage('搜尋成功.', 'success');

					this.complete();
					//console.error(error);.log(data)
				},
				error => {
					this._toast.setMessage('找不到資料', 'warning');
					//console.error(error);.error(error)
				}
				);
		}
	}

	complete() {
		this.submitted = false;
		this.myForm.reset();
	}

}