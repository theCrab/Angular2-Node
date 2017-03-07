import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html'
})

export class LogoutComponent implements OnInit {

	constructor(private authService: AuthService,private router:Router) { }
	
	ngOnInit() { }

	onLogout(){
		this.authService.logout();
		this.router.navigate(['/auth','signin']);
	}
}