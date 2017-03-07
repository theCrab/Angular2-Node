import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/core';

@Component({
  selector: 'app-popUp',
  templateUrl: './popUp.component.html',
  styleUrls: ['./popUp.component.css'],
  animations: [
    trigger('popup', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({
          opacity: 0
        }))
      ])
    ]),
  ]
})
export class PopUpComponent implements OnInit {

  @Input() popupConfig = { show: false, title: 'Title' };
  @Input() autoClose: Boolean = false;
  @Output() callBackFun: EventEmitter<any> = new EventEmitter();
  constructor() { }
  ngOnInit() {
  }

  open(title?) {
    this.popupConfig.title = title;
    this.popupConfig.show = true;
  }

  close(elem?) {
    if (elem == null || (this.autoClose && elem.srcElement.className == "popup")) {
      this.popupConfig.show = false;
      if (this.callBackFun) {
        //Alan:觸發output事件
        this.callBackFun.emit();
      }
    }
  }

}