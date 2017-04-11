import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class PopupService {

    constructor() { }

    public keyDown = new Subject();
    private subscription$: Subscription;

    subs() {
        this.subscription$ = this.keydownEvent.subscribe(
            ((event: KeyboardEvent) => {
                this.keyDown.next('close');
            })
        );
    }

    unSubs() {
        this.subscription$.unsubscribe();
    }

    private keydownEvent = Observable.fromEvent(document, 'keydown')
        // .do(() => {
        //     console.log(event);
        // })
        .filter((event: KeyboardEvent, index) => {
            return event.keyCode === 27;
        });
}