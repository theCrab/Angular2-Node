import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ScheduleService } from './../schedule.service';
import { ProductionService } from './../../production/production.service';
import { DeviceService } from './../../machine/device.service';

import { ToastComponent } from './../../shared/toast/toast.component';
import { PopUpComponent } from './../../shared/popUp/popUp.component';

import { Schedule } from './../schedule.model';
import { Production } from './../../production/production.model';
import { Device } from './../../machine/device.model';
@Component({
  selector: 'app-schedule-input',
  templateUrl: './schedule-input.component.html',
  styleUrls: ['./schedule-input.component.css']
})
export class ScheduleInputComponent {

	private isAdd: Boolean = true;
  myForm: FormGroup;
  //ALan:要修改的物件
  private schedule: Schedule;
  devices = [];
  productions = [];

  private yearRange: string;

  constructor(
    private scheduleService: ScheduleService,
    private productionService: ProductionService,
    private deviceService: DeviceService,
    public toast: ToastComponent,
    private popup: PopUpComponent,
    private formbuilder: FormBuilder) {

    //預設年份往後+5年
    this.yearRange = `${new Date().getFullYear()}:${new Date().getFullYear() + 5}`;

    //Alan:訂閱Service裡面的參數
    this.scheduleService.schedule.subscribe(
      (schedule: Schedule) => {

        this.schedule = schedule;

				if (schedule) {
					this.isAdd = false;
				} else {
					this.isAdd = true;
				}
      }
    );

    this.myForm = new FormGroup({
      scheduleDate: new FormControl(null, Validators.required),
      device: new FormControl(null, Validators.required),
      production: new FormControl(null, Validators.required),
    });

    //Alan:取得設備資料
    this.deviceService.get().subscribe(
      data => {
        this.devices = data;
      },
      error => console.log(error)
    );
    //Alan:取得產品資料		
    this.productionService.get().subscribe(
      data => {
        this.productions = data;
      },
      error => console.log(error)
    );
  }


  onSubmit() {
    if (this.schedule && this.schedule._id) {
      this.schedule.scheduleDate = this.myForm.value.scheduleDate;
      this.schedule.production = this.myForm.value.production;
      this.schedule.device = this.myForm.value.device;
      this.schedule.createData = new Date();

      this.scheduleService.update(this.schedule)
        .subscribe(
        data => {
          this.toast.setMessage('產品修改成功.', 'success');
          console.log(data);
        },
        error => {
          this.toast.setMessage(error, 'warning');
          console.error(error);
        }
        );
    } else {
      const schedule = new Schedule(
        this.myForm.value.scheduleDate,
        this.myForm.value.production,
        this.myForm.value.device,
      );
      this.scheduleService.add(schedule)
        .subscribe(
        data => {
          this.toast.setMessage('產品建立成功.', 'success');
          console.log(data)
        },
        error => {
          this.toast.setMessage(error, 'warning');
          console.error(error)
        }
        );
    }
    this.myForm.reset();
    this.popup.close();
    // console.log(this.myForm);
  }
}