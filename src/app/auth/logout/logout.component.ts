import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from "../auth.service";

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html'
})

export class LogoutComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit() { }

	onLogout() {
		this.authService.logout();
		this.router.navigate(['/auth', 'signin']);
	}
}