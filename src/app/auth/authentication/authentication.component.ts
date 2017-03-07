import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html'
})

export class AuthenticationComponent implements OnInit {

	constructor(private authService: AuthService,private router:Router) { }

	ngOnInit() { }

	isLoggedIn(){
		return this.authService.isLoggedIn();
	}
}