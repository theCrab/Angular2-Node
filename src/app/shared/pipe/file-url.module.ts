import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPipe } from './filter.pipe';
import { FileUrlPipe } from './file-url.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FileUrlPipe,
        SearchPipe
    ],
    exports: [
        FileUrlPipe,
        SearchPipe
    ]
})
export class FileUrlModule { }