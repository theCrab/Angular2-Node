import { PopupService } from './popup.service';
import { Component, Input, Output, EventEmitter, AnimationTransitionEvent, HostListener, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { popup } from "app/shared/animation/animation";

@Component({
  selector: 'app-popUp',
  templateUrl: './popUp.component.html',
  styleUrls: ['./popUp.component.css'],
  animations: [
    popup()
  ]
})
export class PopUpComponent implements OnInit, OnDestroy {

  @Input() popupConfig = { show: false, title: 'Title' };
  @Input() autoClose: Boolean = false;
  @Output() callBackFun: EventEmitter<any> = new EventEmitter();

  private subscription$: Subscription;
  constructor(private _popupService: PopupService) { }

  ngOnInit() {
    this.subscription$ = this._popupService.keyDown.subscribe(
      ((result) => {
        this.close();
      })
    )
  }

  open(title?) {
    this._popupService.subs();
    this.popupConfig.title = title;
    this.popupConfig.show = true;
  }

  close() {
    this._popupService.unSubs();
    this.popupConfig.show = false;
  }

  //Alan:when animation done do this
  animationDone(event: AnimationTransitionEvent) {
    //Alan: if the from state is null
    if (!event.fromState) {
      //Alan: if there is an callBackfunction, then callback
      if (this.callBackFun) {
        this.callBackFun.emit();
      }
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}