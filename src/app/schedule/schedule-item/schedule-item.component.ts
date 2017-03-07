import { Component, OnInit, Input } from '@angular/core';

import { ScheduleService } from './../schedule.service';
import { ProductionService } from './../../production/production.service';
import { DeviceService } from './../../machine/device.service';

import { PopUpComponent } from './../../shared/popUp/popUp.component';
import { ToastComponent } from './../../shared/toast/toast.component';

import { Schedule } from './../schedule.model';
@Component({
  selector: '[app-schedule-item]',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {

  constructor(
    private scheduleService: ScheduleService,
    private productionService: ProductionService,
    private deviceService: DeviceService,
    public toast: ToastComponent,
    private popup: PopUpComponent
  ) { }
  //ALan:要修改的物件

  @Input() item: Schedule;

  totalTime: any;
  state: any = {
    color: 'red',
    text: "未生產",
    state: 0
  }

  ngOnInit() {
    this.checkIsAction();
  }

  //Alan:當畫面載入完成之後
  ngAfterViewInit() {
    //https://github.com/lindell/JsBarcode
    //預設為code 128
    //Alan:Id開頭必須為英文字或底線_
    JsBarcode(`#svg${this.item._id}`, this.item._id);
  }


  onDelete(schedule: Schedule) {
    this.scheduleService.delete(schedule)
      .subscribe(
      data => {
        this.toast.setMessage('產品刪除成功.', 'success');
        console.log(data)
      },
      error => {
        this.toast.setMessage(error, 'warning');
        console.error(error)
      }
      );
  }

  switchEdit(schedule: Schedule) {
    this.scheduleService.switchEdit(schedule)
    this.popup.open(`修改排程－${schedule._id}`);
  }

  checkIsAction() {
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