import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

class activeClass {
  hasvalue: String = "active";
  highlight: String = "highlight";
}

@Directive({
  selector: '[focus-change]'
})
export class FocusChangeDirective implements OnInit {

  constructor(private _elem: ElementRef) { }

  //Alan:要改變的tag
  @Input('focus-change') changeElem;
  //Alan:focus加上去的樣式
  @Input() activeClass: activeClass = new activeClass();


  ngOnInit() {
    this.checkModel();
  }

  @HostListener('focus') onfocus() {
      this.changeElem.className = `${this.activeClass.hasvalue} ${this.activeClass.highlight}`;
  }

  @HostListener('blur') onblur() {
    this.checkModel();
  }

  private checkModel() {
    if (this._elem.nativeElement.value === '') {
      this.changeElem.className = "";
    } else {
      this.changeElem.className = `${this.activeClass.hasvalue}`;
    }
  }
}