import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PopUpComponent } from './../../shared/popUp/popUp.component';
import { ToastComponent } from './../../shared/toast/toast.component';

import { ProductionService } from './../production.service';
import { Production } from './../production.model';
import { FileUploader, FileItem } from "ng2-file-upload";
import { environment } from "../../../environments/environment";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";

@Component({
	selector: 'app-production-input',
	templateUrl: './production-input.component.html',
	styleUrls: ['./production-input.component.css']
})
export class ProductionInputComponent {

	private uploader: FileUploader = environment.getUploadConfig('production');

	private isAdd: Boolean = true;
	//ALan:要修改的物件
	private production: Production;
	myForm: FormGroup;

	private filePreviewPath: SafeUrl = `/file/${environment.defaultImageUrl}`;
	private fileBlobUrl: string;

	constructor(
		private productionService: ProductionService,
		public toast: ToastComponent,
		private popup: PopUpComponent,
		private sanitizer: DomSanitizer) {
		this.uploader.onAfterAddingFile = (fileItem: FileItem) => {

			//Alan:if lenght more than 1, remove first element
			if (this.uploader.queue.length > 1) {
				this.uploader.removeFromQueue(this.uploader.queue[0]);
			}
			//Alan:remove previous blob
			window.URL.revokeObjectURL(this.fileBlobUrl);

			//Alan:create new blob
			this.fileBlobUrl = window.URL.createObjectURL(fileItem._file);
			this.filePreviewPath = this.sanitizer.bypassSecurityTrustUrl((this.fileBlobUrl));
		}

		//Alan:訂閱Service裡面的參數
		this.productionService.production.subscribe(
			(production: Production) => {

				this.production = production

				if (production) {
					this.isAdd = false;

					this.filePreviewPath = `/file/${production.imageUrl}`;
				} else {
					this.isAdd = true;

					this.filePreviewPath = `/file/${environment.defaultImageUrl}`;
					//Alan:remove previous blob
					if (this.fileBlobUrl) {
						window.URL.revokeObjectURL(this.fileBlobUrl);
						this.uploader.clearQueue();
						this.fileBlobUrl = null;
					}
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
			this.productionService.add(production, this.uploader.queue[0])
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

			this.productionService.update(this.production, this.uploader.queue[0])
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

	// totalProgress: number = 0;
	// upload() {
	// 	this.uploader.authToken = localStorage.getItem('token');

	// 	// this.uploader.options.additionalParameter = {toUrl};

	// 	this.uploader.queue[0].upload();

	// 	this.uploader.onProgressAll = (progress: number) => {
	// 		this.totalProgress = progress;
	// 		// console.log(progress);
	// 	};
	// }
}