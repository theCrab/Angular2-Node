import { FileUrlPipe } from './file-url.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FileUrlPipe,
    ],
    exports: [
        FileUrlPipe,
    ]
})
export class FileUrlModule { }