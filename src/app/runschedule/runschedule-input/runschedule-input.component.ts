import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastComponent } from './../../shared/toast/toast.component';
import { ScheduleService } from './../../schedule/schedule.service';

import { Schedule } from './../../schedule/schedule.model';

@Component({
	selector: 'app-runschedule-input',
	templateUrl: './runschedule-input.component.html',
	styleUrls: ['./runschedule-input.component.css']
})
export class RunscheduleInputComponent {

	public schedules = [];
	public myForm: FormGroup;

	constructor(
		private _scheduleService: ScheduleService,
		private _toast: ToastComponent) {
		this.myForm = new FormGroup({
			schedule_id: new FormControl(null, Validators.required),
		});
	}


	onSubmit() {

		// console.log(this.myForm);
		const schedule = new Schedule(
			this.myForm.value.scheduleDate,
			this.myForm.value.production,
			this.myForm.value.device,
			this.myForm.value.creator,
			this.myForm.value.createData,
			this.myForm.value.schedule_id,
		);
		this._scheduleService.search(schedule).subscribe(
			data => {
				this._toast.setMessage('搜尋成功.', 'success');
				//console.error(error);.log(data)
			},
			error => {
				this._toast.setMessage(error.json(), 'warning');
				//console.error(error);.error(error)
			}
		);
		this.myForm.reset();
	}

}