import { Component, Input, AfterViewInit, OnInit } from '@angular/core';

import { ScheduleService } from './../schedule.service';

import { PopUpComponent } from './../../shared/popUp/popUp.component';
import { ToastComponent } from './../../shared/toast/toast.component';

import { Schedule } from './../schedule.model';
import { AlertConfirmService } from "../../shared/alert-confirm/alert-confirm.service";
import { AlertConfirmModel } from "../../shared/alert-confirm/alert-confirm.model";
@Component({
  selector: '[app-schedule-item]',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit, AfterViewInit {

  //ALan:要修改的物件
  @Input('app-schedule-item') item: Schedule;

  totalTime: any;
  state: any = {
    color: 'red',
    text: "未生產",
    state: 0
  }

  constructor(
    private _scheduleService: ScheduleService,
    public _toast: ToastComponent,
    private _popup: PopUpComponent,
    private _alertConfirmService: AlertConfirmService) {

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

  switchEdit(schedule: Schedule) {
    this._scheduleService.switchEdit(schedule)
    this._popup.open(`修改排程－${schedule._id}`);
  }

  onDelete(schedule: Schedule) {
    this._alertConfirmService.confirm(new AlertConfirmModel("刪除", "確定要刪除嗎？"))
      .ok(() => {
        this._scheduleService.delete(schedule)
          .subscribe(
          data => {
            this._toast.setMessage('產品刪除成功.', 'success');
            //console.error(error);.log(data)
          },
          error => {
            this._toast.setMessage(error, 'warning');
            //console.error(error);.error(error)
          });
      });
  }

  checkIsAction() {
    if (this.item) {
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