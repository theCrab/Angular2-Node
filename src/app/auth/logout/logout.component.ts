import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from "../auth.service";

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html'
})

export class LogoutComponent implements OnInit {

	constructor(private _authService: AuthService, private _router: Router) { }

	ngOnInit() { }

	onLogout() {
		this._authService.logout();
		this._router.navigate(['/auth', 'signin']);
	}
}