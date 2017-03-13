import { Directive, ElementRef, Input, HostListener } from '@angular/core';

class activeClass {
  hasvalue: String = "active";
  highlight: String = "highlight";
}

@Directive({
  selector: '[focus-change]'
})
export class FocusChangeDirective {

  constructor(private el: ElementRef) { }

  //Alan:要改變的tag
  @Input('focus-change') changeElem;
  //Alan:focus加上去的樣式
  @Input() activeClass: activeClass = new activeClass();

  @HostListener('focus') onfocus() {
    this.changeElem.classList.add(this.activeClass.hasvalue);
    this.changeElem.classList.add(this.activeClass.highlight);
  }

  @HostListener('blur') onblur() {
    if (this.el.nativeElement.value === '') {
      this.changeElem.className = "";
    } else {
      this.changeElem.classList.remove(this.activeClass.highlight);
    }
  }
}