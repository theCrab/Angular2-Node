import { Component, Input, AfterViewInit, OnInit } from '@angular/core';

import { ScheduleService } from './../schedule.service';
import { Schedule } from './../schedule.model';

import { ToastComponent } from "app/shared/component/toast/toast.component";
import { PopUpComponent } from "app/shared/component/popUp/popUp.component";

import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";
import { AlertConfirmModel } from "app/shared/component/alert-confirm/alert-confirm.model";

import { DateFormat } from "assets/ts/DateFormat";

@Component({
  selector: '[app-schedule-item]',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit, AfterViewInit {

  //ALan:要修改的物件
  @Input('app-schedule-item') item: Schedule;
  @Input('index') index: number;

  public totalTime: any;
  public state: any = {
    color: 'red',
    text: "未生產",
    state: 0
  }

  constructor(
    private _scheduleService: ScheduleService,
    private _toast: ToastComponent,
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
    try {
      JsBarcode(`#svg${this.item._id}`, this.item._id);
    } catch (error) {
      console.log('JsBarcode not found!');
    }
  }

  switchEdit(schedule: Schedule) {
    this._scheduleService.switchEdit(this.index, schedule)
    this._popup.open(`修改排程－${schedule._id}`);
  }

  onDelete(schedule: Schedule) {
    this._alertConfirmService.confirm(new AlertConfirmModel("刪除", "確定要刪除嗎？"))
      .ok(() => {
        this._scheduleService.delete(this.index, schedule)
          .subscribe(
          data => {
            this._toast.setMessage('排程刪除成功.', 'success');
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
  }
}