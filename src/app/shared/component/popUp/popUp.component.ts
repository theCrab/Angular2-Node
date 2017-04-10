import { Component, Input, Output, EventEmitter, AnimationTransitionEvent } from '@angular/core';

import { popup } from "app/shared/animation/animation";

@Component({
  selector: 'app-popUp',
  templateUrl: './popUp.component.html',
  styleUrls: ['./popUp.component.css'],
  animations: [
    popup()
  ]
})
export class PopUpComponent {

  @Input() popupConfig = { show: false, title: 'Title' };
  @Input() autoClose: Boolean = false;
  @Output() callBackFun: EventEmitter<any> = new EventEmitter();
  constructor() { }

  open(title?) {
    this.popupConfig.title = title;
    this.popupConfig.show = true;
  }

  close(elem?) {
    if (elem == null || (this.autoClose && elem.srcElement.className == "popup")) {
      this.popupConfig.show = false;
    }
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



}