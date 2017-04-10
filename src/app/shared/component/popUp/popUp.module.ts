import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopUpComponent } from './../popUp/popUp.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        PopUpComponent,
    ],
    providers: [
        PopUpComponent,
    ],
    exports: [
        PopUpComponent,
    ]
})
export class PopUpModule { }