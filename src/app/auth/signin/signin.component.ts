import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from "../auth.service";
import { User } from "../user.model";

import { environment } from "../../../environments/environment";
@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['../auth.component.css']
})

export class SigninComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit() {
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

				if (this.authService.redirectUrl === environment.nonAuthenticationUrl) {
					this.authService.redirectUrl = environment.mainPageUrl;
				}
				this.router.navigateByUrl(this.authService.redirectUrl);
			},
			error => console.error(error)
			);
		this.myForm.reset({ email: user.email });
	}

	changeLabel(elem) {
		elem.className = 'active';
		console.log(elem);
	}

	myForm: FormGroup;
}