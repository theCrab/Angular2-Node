import { Component, OnDestroy, OnInit } from '@angular/core';

import { ScheduleService } from './../../schedule/schedule.service';
import { Schedule } from 'app/model/schedule.model';

import TakeUntilDestroy from 'angular2-take-until-destroy';

@Component({
  selector: 'app-runschedule-list',
  templateUrl: './runschedule-list.component.html',
  styleUrls: ['./runschedule-list.component.css']
})
@TakeUntilDestroy
export class RunscheduleListComponent implements OnInit, OnDestroy {

  public currentPage: Number = 1;
  public itemsPerPage: Number = 10;

  public schedules: Schedule[] = [];

  constructor(private _scheduleService: ScheduleService) { }

  ngOnInit() {
    this._scheduleService.schedulesChanged
      .takeUntil((<any>this).componentDestroy())
      .subscribe(
      (schedules: Schedule[]) => {
        this.schedules = schedules;
      });
  }

  ngOnDestroy(): void {
  }
}