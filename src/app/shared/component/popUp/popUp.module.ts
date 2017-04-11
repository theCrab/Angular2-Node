import { PopupService } from './popup.service';
import { PopUpComponent } from './popUp.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        PopUpComponent,
    ],
    providers: [
        PopUpComponent,
        PopupService
    ],
    exports: [
        PopUpComponent,
    ]
})
export class PopUpModule { }