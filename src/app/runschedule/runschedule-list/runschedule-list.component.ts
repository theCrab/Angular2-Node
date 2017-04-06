import { Component, OnInit } from '@angular/core';

import { ScheduleService } from './../../schedule/schedule.service';
@Component({
  selector: 'app-runschedule-list',
  templateUrl: './runschedule-list.component.html',
  styleUrls: ['./runschedule-list.component.css']
})
export class RunscheduleListComponent implements OnInit {

  constructor(private _scheduleService: ScheduleService) { }

	//Alan:此頁物件
	public currentPage: Number = 1;
	public itemsPerPage: Number = 10;
  public schedules = [];
  ngOnInit() {

    this._scheduleService.schedulesChange.subscribe(
      data => this.schedules = data
    );
  }
}