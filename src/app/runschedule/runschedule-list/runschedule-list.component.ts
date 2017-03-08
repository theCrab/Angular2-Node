import { Component, OnInit } from '@angular/core';

import { ScheduleService } from './../../schedule/schedule.service';
@Component({
  selector: 'app-runschedule-list',
  templateUrl: './runschedule-list.component.html',
  styleUrls: ['./runschedule-list.component.css']
})
export class RunscheduleListComponent implements OnInit {

  constructor(private scheduleService: ScheduleService) { }

	//Alan:此頁物件
	private currentPage: Number = 1;
	private itemsPerPage: Number = 10;
  schedules = [];
  ngOnInit() {

    this.scheduleService.schedulesChange.subscribe(
      data => this.schedules = data
    );
  }
}