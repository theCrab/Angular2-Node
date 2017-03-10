import { User } from './../../user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './../../auth.service';
@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['../authentication.component.css']
})

export class SigninComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit() {

		// const token = localStorage.getItem('token') ?
		// 	'?token=' + localStorage.getItem('token')
		// 	: '';
		// if (token !== '') {
		// 	this.router.navigateByUrl('/auth/logout');
		// }


		this.myForm = new FormGroup({
			email: new FormControl(null, [
				Validators.required,
				Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]),
			password: new FormControl(null, Validators.required),
		});
	}

	onSubmit() {
		// console.log(this.myForm);

		const user = new User(
			this.myForm.value.email,
			this.myForm.value.password,
		);
		this.authService.signin(user)
			.subscribe(
			data => {
				localStorage.setItem('token', data.token);
				localStorage.setItem('userId', data.userId);
				this.router.navigateByUrl(this.authService.redirectUrl);
			},
			error => console.error(error)
			);
		this.myForm.reset();
	}

	changeLabel(elem) {
		elem.className = 'active';
		console.log(elem);
	}

	myForm: FormGroup;
}