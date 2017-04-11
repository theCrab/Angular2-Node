import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertConfirmService } from "./alert-confirm.service";

import { ModalDirective } from 'ng2-bootstrap';
import { AlertConfirmModel } from "./alert-confirm.model";

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.css']
})
export class AlertConfirmComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  public message: AlertConfirmModel;
  //Alan:用來切換subscribed狀態
  public subscribedToClosing: boolean = false;
  public isConfirm: boolean = false;
  public confirmed: boolean = false;
  public isShow: boolean = false;

  public classList = {
    success: {
      title: 'alert-success',
      icon: 'fa-check'
    },
    info: {
      title: 'alert-info',
      icon: 'fa-info-circle'
    },
    warning: {
      title: 'alert-warning',
      icon: 'fa-question-circle'
    },
    error: {
      title: 'alert-danger',
      icon: 'fa-exclamation-circle'
    }
  };
  public nowClassType = this.classList.success;

  constructor(private _alertConfirmService: AlertConfirmService) { }

  ngOnInit() {

    this._alertConfirmService.alert$.subscribe((message: AlertConfirmModel) => {
      this.isShow = true;
      this.isConfirm = false;
      this.message = message;
      this.nowClassType = message.type == null ? this.classList.error : this.classList[`${message.type}`];
      this.modal.show();
      this.handleClose();
    });

    this._alertConfirmService.confirm$.subscribe((message: AlertConfirmModel) => {
      this.isShow = true;
      this.isConfirm = true;
      this.message = message;
      this.nowClassType = message.type == null ? this.classList.warning : this.classList[`${message.type}`];
      this.modal.show();
      this.handleClose();
    });
  }

  private handleClose() {
    if (!this.subscribedToClosing) {
      this.modal.onHidden.subscribe(() => {
        this.isShow = false;
        this.subscribedToClosing = true;
        if (this.isConfirm) {
          if (this.confirmed) {
            this._alertConfirmService.confirmCallback._ok();
          } else {
            this._alertConfirmService.confirmCallback._cancel();
          }
          this.confirmed = false;
        } else {
          this._alertConfirmService.alertCallback._ok();
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