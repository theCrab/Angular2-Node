import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from "app/services/auth.service";

import { User } from "app/model/user.model";

import { environment } from "environments/environment";

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['../auth.component.css', './signin.component.css']
})

export class SigninComponent implements OnInit {

	public myForm: FormGroup;

	constructor(private _authService: AuthService, private _router: Router) { }

	ngOnInit() {
		this.myForm = new FormGroup({
			email: new FormControl('e936106@gmail.com', [
				Validators.required,
				Validators.email,
				Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]),
			password: new FormControl('1111', [
				Validators.required,
				Validators.minLength(4)
			]),
			remeberMe: new FormControl(false)
		});
	}

	onSubmit() {
		// console.log(this.myForm);

		const user = new User(
			this.myForm.value.email,
			this.myForm.value.password,
		);
		user.remeberMe = this.myForm.value.remeberMe;

		this._authService.signin(user)
			.subscribe(
			data => {
				if (this.myForm.value.remeberMe) {
					localStorage.setItem('token', data.token);
					localStorage.setItem('userId', data.userId);
				}
				sessionStorage.setItem('token', data.token);
				sessionStorage.setItem('userId', data.userId);

				if (this._authService.redirectUrl === environment.nonAuthenticationUrl) {
					this._authService.redirectUrl = environment.mainPageUrl;
				}
				this._router.navigateByUrl(this._authService.redirectUrl);
			},
			error => console.error(error)
			);
		this.myForm.reset(
			{
				email: user.email,
				remeberMe: this.myForm.value.remeberMe
			});
	}
}