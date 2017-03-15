import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PopUpComponent } from './../../shared/popUp/popUp.component';
import { ToastComponent } from './../../shared/toast/toast.component';

import { ProductionService } from './../production.service';
import { Production } from './../production.model';

@Component({
	selector: 'app-production-input',
	templateUrl: './production-input.component.html',
	styleUrls: ['./production-input.component.css']
})
export class ProductionInputComponent {

	private isAdd: Boolean = true;
	//ALan:要修改的物件
	private production: Production;
	myForm: FormGroup;

	constructor(
		private productionService: ProductionService,
		public toast: ToastComponent,
		private popup: PopUpComponent) {
		//Alan:訂閱Service裡面的參數
		this.productionService.production.subscribe(
			(production: Production) => {
				
				this.production = production

				if (production) {
					this.isAdd = false;
				} else {
					this.isAdd = true;
				}
			}
		);

		this.myForm = new FormGroup({
			name: new FormControl(null, Validators.required),
			requireDate: new FormControl(null, Validators.required),
			count: new FormControl(null, Validators.required),
		});
	}


	onSubmit() {
		if (this.isAdd) {
			const production = new Production(
				this.myForm.value.name,
				this.myForm.value.count,
				this.myForm.value.requireDate,
			);
			this.productionService.add(production)
				.subscribe(
				data => {
					this.toast.setMessage('產品建立成功.', 'success');
					console.log(data)
				},
				error => {
					this.toast.setMessage(error, 'warning');
					console.error(error)
				}
				);
		} else {

			this.production.name = this.myForm.value.name
			this.production.count = this.myForm.value.count
			this.production.requireDate = this.myForm.value.requireDate

			this.productionService.update(this.production)
				.subscribe(
				data => {
					this.toast.setMessage('產品修改成功.', 'success');
					console.log(data);
				},
				error => {
					this.toast.setMessage(error, 'warning');
					console.error(error);
				}
				);
		}
		this.popup.close();
		this.myForm.reset();
	}

}