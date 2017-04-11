import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { ScheduleService } from './../../schedule/schedule.service';
import { Schedule } from './../../schedule/schedule.model';
@Component({
  selector: 'app-runschedule-list',
  templateUrl: './runschedule-list.component.html',
  styleUrls: ['./runschedule-list.component.css']
})
export class RunscheduleListComponent implements OnInit, OnDestroy {

  public currentPage: Number = 1;
  public itemsPerPage: Number = 10;

  public schedules: Schedule[] = [];
  private subscription$: Subscription;

  constructor(private _scheduleService: ScheduleService) { }
  
  ngOnInit() {
    this.subscription$ = this._scheduleService.schedulesChanged
      .subscribe(
      (schedules: Schedule[]) => {
        this.schedules = schedules;
      });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}