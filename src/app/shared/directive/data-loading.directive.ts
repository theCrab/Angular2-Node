import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Compiler,
  Input,
  NgModule,
  Component
} from '@angular/core';


import { Subject } from 'rxjs/Subject';
@Directive({
  selector: '[myDataLoading]'
})
export class DataLoadingDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private compiler: Compiler) { }

  @Input() set myDataLoading(condition: boolean) {

    this.viewContainer.clear();
    if (condition) {
      // 新增 DOM
      this.viewContainer.createEmbeddedView(this.templateRef);

    } else {
      // 移除 DOM
      this.addComponent();
    }
  }

  private addComponent() {
    @Component({
      template: `
                <div class='loader'>
                  <div class='circle'></div>
                  <div class='circle'></div>
                  <div class='circle'></div>
                  <div class='circle'></div>
                  <div class='circle'></div>
                </div> 
      `,
      styleUrls: ['./data-loading.component.css']
    })
    class TemplateComponent { }

    @NgModule({ declarations: [TemplateComponent] })
    class TemplateModule { }

    const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = mod.componentFactories.find((comp) =>
      comp.componentType === TemplateComponent
    );

    this.viewContainer.createComponent(factory);
  }
}