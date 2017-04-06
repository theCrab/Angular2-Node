import { environment } from './../../../environments/environment';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-pagination',
  templateUrl: './my-pagination.component.html',
  styleUrls: ['./my-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MyPaginationComponent {

  @Input() id: string;
  @Input() maxSize: number = 10;
  @Input()
  get directionLinks(): boolean {
    return this._directionLinks;
  }
  set directionLinks(value: boolean) {
    this._directionLinks = !!value && <any>value !== 'false';
  }
  @Input()
  get autoHide(): boolean {
    return this._autoHide;
  }
  set autoHide(value: boolean) {
    this._autoHide = !!value && <any>value !== 'false';
  }
  @Input() previousLabel: string = 'Previous';
  @Input() nextLabel: string = 'Next';
  @Input() screenReaderPaginationLabel: string = 'Pagination';
  @Input() screenReaderPageLabel: string = 'page';
  @Input() screenReaderCurrentLabel: string = `You're on page`;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();



  @Input() perPageNum: number = environment.defaultPerPageNum;

  @Output() perPageChange: EventEmitter<number> = new EventEmitter<number>();

  private _directionLinks: boolean = true;
  private _autoHide: boolean = false;

  emitPerPage() {
    //Alan:小於0或不是數字就丟1出去
    if (this.perPageNum <= 0 || isNaN(this.perPageNum)) {
      this.perPageChange.emit(1);
    } else {
      this.perPageChange.emit(this.perPageNum);
    }
  }

  GoNext(p) {
    if (!p.isLastPage()) {
      p.next()
    }
  }

}