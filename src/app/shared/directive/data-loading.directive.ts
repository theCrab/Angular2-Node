import { Directive, ElementRef, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: '[myDataLoading]'
})
export class DataLoadingDirective implements OnInit {

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer
  ) { }

  ngOnInit() {
    // this._renderer.createElement(this._el.nativeElement.parentNode, 'button');

    // var temp = document.createElement('div');

    // temp.innerHTML = `
    //   <div class='loader'>
    //     <div class='circle'></div>
    //     <div class='circle'></div>
    //     <div class='circle'></div>
    //     <div class='circle'></div>
    //     <div class='circle'></div>
    //   </div>
    // `;

    // console.log(this._el.nativeElement);

    // this._el.nativeElement.innerHTML = `
    //   <div class='loader'>
    //     <div class='circle'></div>
    //     <div class='circle'></div>
    //     <div class='circle'></div>
    //     <div class='circle'></div>
    //     <div class='circle'></div>
    //   </div>
    // `;
  }

  // @HostListener('mouseenter') onMouseEnter() {
  //   this._renderer.createElement(this._el.nativeElement.parentNode, 'button');
  // }

}