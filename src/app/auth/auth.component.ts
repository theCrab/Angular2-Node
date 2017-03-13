import { Router } from '@angular/router';
import { Component, ViewChild, HostListener, AfterViewChecked } from '@angular/core';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})

export class AuthComponent implements AfterViewChecked {

	@ViewChild('formTag') formTag;

	constructor() { }

	ngAfterViewChecked() {
		//Alan:如果是載入或是點擊route事件的時候
		if (event && (event.type == "load" || event.type == "click")) {
			let marginHeight = (window.innerHeight - this.formTag.nativeElement.offsetHeight) * 0.5;

			this.formTag.nativeElement.style.margin = `${marginHeight}px auto`;
		}
	}

	@HostListener('window:resize', ['$event']) onResize(event) {
		//Alan:window height decrease tag height
		let marginHeight = (event.target.innerHeight - this.formTag.nativeElement.offsetHeight) * 0.5;

		this.formTag.nativeElement.style.margin = `${marginHeight}px auto`;
	}
}