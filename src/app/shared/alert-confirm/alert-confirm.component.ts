import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertConfirmService } from "./alert-confirm.service";

import { ModalDirective } from 'ng2-bootstrap';
import { AlertConfirmModel } from "./alert-confirm.model";

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.css']
})
export class AlertConfirmComponent {
  @ViewChild('modal') public modal: ModalDirective;
  private message: AlertConfirmModel;
  //Alan:用來切換subscribed狀態
  private subscribedToClosing: boolean = false;
  private isConfirm: boolean = false;
  private confirmed: boolean = false;

  constructor(
    private alertConfirmService: AlertConfirmService
  ) {

    alertConfirmService.alert$.subscribe((message: AlertConfirmModel) => {
      this.isConfirm = false;
      this.message = message;
      this.modal.show();
      this.handleClose();
    });

    alertConfirmService.confirm$.subscribe((message: AlertConfirmModel) => {
      this.isConfirm = true;
      this.message = message;
      this.modal.show();
      this.handleClose();
    });

  }

  private handleClose() {
    if (!this.subscribedToClosing) {
      this.modal.onHidden.subscribe(() => {
        this.subscribedToClosing = true;
        if (this.isConfirm) {
          if (this.confirmed) {
            this.alertConfirmService.confirmCallback._ok();
          } else {
            this.alertConfirmService.confirmCallback._cancel();
          }
          this.confirmed = false;
        } else {
          this.alertConfirmService.alertCallback._ok();
        }
      });
    }
  }

  private ok(): void {
    this.confirmed = true;
    this.modal.hide();
  }

  private cancel(): void {
    this.confirmed = false;
    this.modal.hide();
  }

}