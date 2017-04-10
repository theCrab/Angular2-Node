import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from "../auth.service";
import { User } from "../user.model";
import { Router } from "@angular/router";

import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";
import { AlertConfirmModel } from "app/shared/component/alert-confirm/alert-confirm.model";

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['../auth.component.css']
})

export class SignupComponent implements OnInit {

	public myForm: FormGroup;
	
	constructor(
		private _authService: AuthService,
		private _alertConfirmService: AlertConfirmService,
		private _router: Router) {

		this.myForm = new FormGroup({
			firstName: new FormControl(null, Validators.required),
			lastName: new FormControl(null, Validators.required),
			email: new FormControl(null, [
				Validators.required,
				Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]),
			password: new FormControl(null, Validators.required),
		});
	}

	ngOnInit() {
	}

	onSubmit() {
		// console.log(this.myForm);
		const user = new User(
			this.myForm.value.email,
			this.myForm.value.password,
			this.myForm.value.firstName,
			this.myForm.value.lastName,
		);
		this._authService.signup(user)
			.subscribe(
			data => {
				this._alertConfirmService.alert(new AlertConfirmModel("註冊成功", "恭喜您註冊成功，請重新登入",'success'))
					.ok(() => {
						this._router.navigateByUrl('/auth/signin');
					})
			},
			// error => console.error(error)
			);
		this.myForm.reset();
	}

}