import { environment } from './../../environments/environment';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnDestroy {

	subscript;
	@ViewChild('formTag') formTag;
	private systemName = environment.systemName;
	constructor(
		private _router: Router) {
		this.subscript = _router.events.subscribe((event: any) => {
			// console.log(event);
			switch (event.urlAfterRedirects) {
				case "/auth/signup":
					this.formTag.nativeElement.style.height = '549px';
					break;
				default:
					this.formTag.nativeElement.style.height = '486px';
					break;
			}
		});
	}

	ngOnDestroy(): void {
		this.subscript.unsubscribe();
	}
}