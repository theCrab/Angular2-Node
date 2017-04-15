import { Component, OnDestroy, OnInit } from '@angular/core';

import { Schedule } from 'app/model/schedule.model';

import TakeUntilDestroy from 'angular2-take-until-destroy';
import { popup } from "app/shared/animation/animation";
import { ScheduleService } from "app/services/schedule.service";

@Component({
  selector: 'app-runschedule-list',
  templateUrl: './runschedule-list.component.html',
  styleUrls: ['./runschedule-list.component.css'],
  animations: [
    popup()
  ]
})
@TakeUntilDestroy
export class RunscheduleListComponent implements OnInit, OnDestroy {

  public currentPage: Number = 1;
  public itemsPerPage: Number = 10;

  public schedules: Schedule[] = [];

  public isLoading: boolean = false;

  constructor(private _scheduleService: ScheduleService) { }

  ngOnInit() {
    this._scheduleService.schedulesChanged
      .takeUntil((<any>this).componentDestroy())
      .subscribe(
      (schedules: Schedule[]) => {
        this.schedules = schedules;
      });

    this._scheduleService.isLoading
      .takeUntil((<any>this).componentDestroy())
      .subscribe(
      (state: boolean) => {
        this.isLoading = state;
      });
  }

  ngOnDestroy(): void {
  }
}