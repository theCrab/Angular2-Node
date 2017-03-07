import { Component, OnInit, Input } from '@angular/core';

import { Schedule } from './../../schedule/schedule.model';

import { ToastComponent } from './../../shared/toast/toast.component';

import { ScheduleService } from './../../schedule/schedule.service';
@Component({
  selector: '[app-runschedule-item]',
  templateUrl: './runschedule-item.component.html',
  styleUrls: ['./runschedule-item.component.css']
})
export class RunscheduleItemComponent implements OnInit {

  constructor(private scheduleService: ScheduleService,
    public toast: ToastComponent) { }

  //ALan:要修改的物件
  @Input() item: Schedule;
  totalTime: any;
  state: any = {
    color: 'red',
    text: "未生產",
    state: 0
  }

  ngOnInit() {
    if (this.item.actionDate != null) {
      if (this.item.finishDate != null) {
        this.state = {
          color: 'blue',
          text: "生產完成",
          state: 2
        }
        //Alan:計算耗時
        this.totalTime =
          this.dhms(new Date(this.item.finishDate).getTime() - new Date(this.item.actionDate).getTime());
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

    this.scheduleService.update(this.item)
      .subscribe(
      data => {
        this.toast.setMessage('開始生產.', 'success');

        this.ngOnInit();

        console.log(data);
      },
      error => {
        this.toast.setMessage(error, 'warning');
        console.error(error);
      }
      );
  }


  finishSchedule() {

    this.item.finishDate = new Date();

    this.scheduleService.update(this.item)
      .subscribe(
      data => {
        this.toast.setMessage('結束生產.', 'success');

        this.ngOnInit();

        console.log(data);
      },
      error => {
        this.toast.setMessage(error, 'warning');
        console.error(error);
      }
      );
  }

  dhms(t) {
    let cd: any = 24 * 60 * 60 * 1000,
      ch: any = 60 * 60 * 1000,
      d: any = Math.floor(t / cd),
      h: any = '0' + Math.floor((t - d * cd) / ch),
      m: any = '0' + Math.round((t - d * cd - h * ch) / 60000),
      s: any = '0' + Math.round((t - d * cd - h * ch - m * 1000) / 1000);
    return [d, h.substr(-2), m.substr(-2), s.substr(-2)].join(':');
  }
}