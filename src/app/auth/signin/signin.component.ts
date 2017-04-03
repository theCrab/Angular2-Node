import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from "../auth.service";
import { User } from "../user.model";

import { environment } from "../../../environments/environment";
@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['../auth.component.css', './signin.component.css']
})

export class SigninComponent implements OnInit {

	myForm: FormGroup;

	constructor(private authService: AuthService, private router: Router) {
		this.myForm = new FormGroup({
			email: new FormControl('e936106@gmail.com', [
				Validators.required,
				Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]),
			password: new FormControl('1111', Validators.required),
			remeberMe: new FormControl(false)
		});
	}

	ngOnInit() {
	}

	onSubmit() {
		// console.log(this.myForm);

		const user = new User(
			this.myForm.value.email,
			this.myForm.value.password,
		);
		user.remeberMe = this.myForm.value.remeberMe;

		this.authService.signin(user)
			.subscribe(
			data => {
				if (this.myForm.value.remeberMe) {
					localStorage.setItem('token', data.token);
					localStorage.setItem('userId', data.userId);
				}
				sessionStorage.setItem('token', data.token);
				sessionStorage.setItem('userId', data.userId);

				if (this.authService.redirectUrl === environment.nonAuthenticationUrl) {
					this.authService.redirectUrl = environment.mainPageUrl;
				}
				this.router.navigateByUrl(this.authService.redirectUrl);
			},
			error => console.error(error)
			);
		this.myForm.reset(
			{
				email: user.email,
				remeberMe: this.myForm.value.remeberMe
			});
	}

	changeLabel(elem) {
		elem.className = 'active';
		console.log(elem);
	}

}