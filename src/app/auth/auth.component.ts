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
		//Alan:when the event is load or click(change route)
		if (event && (event.type == "load" || event.type == "click")) {
			this.setSize(window.innerHeight);
		}
	}
z
	@HostListener('window:resize', ['$event']) onResize(event) {
		this.setSize(event.target.innerHeight);
	}

	private setSize(height: number) {
		//Alan:window height decrease tag height
		let marginHeight = (height - this.formTag.nativeElement.offsetHeight) * 0.5;

		this.formTag.nativeElement.style.margin = `${marginHeight}px auto`;
	}
}