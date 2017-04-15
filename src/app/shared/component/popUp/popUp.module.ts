import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopUpComponent } from './popUp.component';
import { PopupService } from './popup.service';
import { DataLoadingDirective } from "app/shared/directive/data-loading.directive";
import { DataLoadingComponent } from "app/shared/component/data-loading/data-loading.component";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        PopUpComponent,
        DataLoadingDirective,
        DataLoadingComponent
    ],
    providers: [
        PopUpComponent,
        PopupService,
    ],
    exports: [
        PopUpComponent,
        DataLoadingDirective,
        DataLoadingComponent
    ]
})
export class PopUpModule { }