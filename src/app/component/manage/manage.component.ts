import { Component, OnInit, trigger, state, transition, style, animate, Input, AnimationTransitionEvent } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  animations: [
    trigger('isVisibleChanged', [
      state('1', style({ opacity: 1, transform: 'scale(1.0)' })),
      state('0', style({ opacity: 0, transform: 'scale(0.0)' })),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('900ms'))
    ])
  ],
})
export class ManageComponent implements OnInit {
  isVisible: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  animationDone(event: AnimationTransitionEvent) {
    //Alan: if the from state is null
    console.log(event);
  }

}