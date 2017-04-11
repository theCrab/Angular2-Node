import { Component, OnInit, Input } from '@angular/core';

import { Schedule } from 'app/model/schedule.model';

import { ToastComponent } from "app/shared/component/toast/toast.component";
import { ScheduleService } from './../../schedule/schedule.service';

import { DateFormat } from "assets/ts/DateFormat";
@Component({
  selector: '[app-runschedule-item]',
  templateUrl: './runschedule-item.component.html',
  styleUrls: ['./runschedule-item.component.css']
})
export class RunscheduleItemComponent implements OnInit {

  constructor(
    private _scheduleService: ScheduleService,
    private _toast: ToastComponent) { }

  //ALan:要修改的物件
  @Input('app-runschedule-item') item: Schedule;
  public totalTime: any;
  public state: any = {
    color: 'red',
    text: "未生產",
    state: 0
  }

  ngOnInit() {
    //console.error(error);.log(this.item);
    if (this.item.actionDate != null) {
      if (this.item.finishDate != null) {
        this.state = {
          color: 'blue',
          text: "生產完成",
          state: 2
        }
        //Alan:計算耗時
        this.totalTime =
          DateFormat.dhms(new Date(this.item.finishDate).getTime() - new Date(this.item.actionDate).getTime());
      } else {
        this.state = {
          color: '#ec971f',
          text: "生產中",
          state: 1
        }
      }
    }
  }

  runSchedule() {
    this.item.actionDate = new Date();
    this._scheduleService.update(this.item)
      .subscribe(
      data => {
        this._toast.setMessage('開始生產.', 'success');

        this.ngOnInit();

        // //console.log(data);
      },
      error => {
        this._toast.setMessage(error, 'warning');
        // //console.error(error);
      }
      );
  }

  finishSchedule() {
    this.item.finishDate = new Date();
    this._scheduleService.update(this.item)
      .subscribe(
      data => {
        this._toast.setMessage('結束生產.', 'success');
        this.ngOnInit();
        //console.log(data);
      },
      error => {
        this._toast.setMessage(error, 'warning');
        //console.error(error);
      }
      );
  }

}