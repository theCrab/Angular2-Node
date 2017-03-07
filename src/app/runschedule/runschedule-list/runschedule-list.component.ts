import { Component, OnInit } from '@angular/core';

import { ScheduleService } from './../../schedule/schedule.service';
@Component({
  selector: 'app-runschedule-list',
  templateUrl: './runschedule-list.component.html',
  styleUrls: ['./runschedule-list.component.css']
})
export class RunscheduleListComponent implements OnInit {

  constructor(private scheduleService: ScheduleService) { }

  schedules = [];
  ngOnInit() {

    this.scheduleService.schedulesChange.subscribe(
      data => this.schedules = data
    );
  }
}