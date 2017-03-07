import { Component, Input, Output, EventEmitter } from '@angular/core';

// import * as moment from "moment";
/* 
  參考網址：http://codepen.io/jaromvogel/pen/aNPRwG
*/
@Component({
  selector: 'my-datepicker',
  templateUrl: './my-datepicker.component.html',
  styleUrls: ['./my-datepicker.component.css']
})
export class MyDatepickerComponent {
  @Input() dateModel: Date;
  @Input() onlyDate: Boolean = false;
  @Output() dateModelChange: EventEmitter<Date> = new EventEmitter();
  private showDatepicker: boolean = false;

  switchDateTimePicker() {
    this.showDatepicker = !this.showDatepicker;
  }
  //如果是只有日期的模式
  selectDate(newDate: Date) {
    if (this.onlyDate) {
      this.showDatepicker = false;
      this.dateModelChange.emit(newDate)
    }
  }
  save() {
    this.showDatepicker = false;
    this.dateModelChange.emit(this.dateModel)
  }
}