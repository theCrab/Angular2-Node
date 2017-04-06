import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class Lazyload3rdService {

    constructor() { }

    init(id: string, url: string, cb): Observable<any> {
        return new Observable(observer => {
            this.append3rd(id, url);
            observer.complete();
        }).mergeMap(data => {
            return cb;
        });
    }

    append3rd(id: string, url: string) {
        if (document.getElementById(id)) {
            return;
        }
        let js: HTMLScriptElement,
            ref = document.getElementsByTagName('script')[0];

        js = document.createElement('script');
        js.id = id;
        js.async = true;
        js.src = url;
        ref.parentNode.insertBefore(js, ref);

        console.log(123);
    }

}