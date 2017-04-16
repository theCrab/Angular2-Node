import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Menu } from "app/model/menu.model";

import { AlertConfirmService } from './../shared/component/alert-confirm/alert-confirm.service';
import { environment } from "environments/environment";

@Injectable()
export class MenuService {

  constructor(
    private _http: Http,
    private _alertConfirmService: AlertConfirmService) { }

  private menus: Menu[] = [];
  private editIndex: number;

  public menu = new Subject<Menu>();

  get() {
    return this._http.get(environment.serverUrl + '/menu')
      .map((response: Response) => {
        this.menus = response.json().obj
          .map((item) => {
            return new Menu(item);
          });
        return this.menus;
      })
      .catch((error: Response) => {
        this._alertConfirmService.alert(error.json());
        return Observable.throw(error.json());
      });
  }

  // add(menu: menu, img: FileItem) {

  //     if (img) {
  //         return this.upload(img._file)
  //             .concatMap(
  //             (response: Response) => {
  //                 let file = response.json();

  //                 menu.imageUrl = file.obj[0].path;
  //                 return this.postAdd(menu);
  //             });
  //     } else {
  //         return this.postAdd(menu);
  //     }

  //     // (inner, outter, eIndex, resIndex) => {
  //     //     // let result = outter.json();
  //     //     // let menu = this.createModel(result.obj);
  //     //     // this.menus.push(menu);
  //     //     // return menu;
  //     // })
  //     // .catch((error: Response) => {
  //     //     this.alertConfirmService.alert(error.json());
  //     //     return Observable.throw(error.json())
  //     // });
  // }

  // update(menu: menu, img: FileItem) {
  //     let body = JSON.stringify(menu);

  //     if (img) {
  //         return this.upload(img._file)
  //             .concatMap(
  //             (response: Response) => {
  //                 let file = response.json();

  //                 menu.imageUrl = file.obj[0].path;
  //                 return this.postUpdate(menu);
  //             });
  //     } else {
  //         return this.postUpdate(menu);
  //     }
  // }

  // delete(index: number, menu: menu) {

  //     return this._http.delete(`${environment.serverUrl}/menu/${menu._id}`, environment.getRequestOptions())
  //         .map((response: Response) => {
  //             this.menus.splice(index, 1);

  //             this.menusChanged.next(this.menus.slice());
  //             return this.menus;
  //         })
  //         .catch((error: Response) => {
  //             this._alertConfirmService.alert(error.json());
  //             return Observable.throw(error.json());
  //         });
  // }

  // switchEdit(index: number, menu: menu) {
  //     this.editIndex = index;
  //     this.menu.next(Object.assign({}, menu));
  // }
  // clearEdit() {
  //     this.editIndex = null;
  //     this.menu.next(null);
  // }

  // postAdd(menu: menu): Observable<any> {
  //     let body = JSON.stringify(menu);

  //     return this._http.post(environment.serverUrl + '/menu', body, environment.getRequestOptions())
  //         .map((response: Response) => {
  //             let menu = this.createModel(response.json().obj);
  //             this.menus.push(menu);

  //             this.menusChanged.next(this.menus.slice());

  //             return menu;
  //         })
  //         .catch((error: Response) => {
  //             this._alertConfirmService.alert(error.json());
  //             return Observable.throw(error.json())
  //         });
  // }

  // postUpdate(menu: menu): Observable<any> {
  //     let body = JSON.stringify(menu);

  //     return this._http.patch(environment.serverUrl + '/menu/' + menu._id, body, environment.getRequestOptions())
  //         .map((response: Response) => {
  //             this.menus[this.editIndex]
  //                 = this.createModel(response.json().obj);

  //             this.menusChanged.next(this.menus.slice());
  //             return menu;
  //         })
  //         .catch((error: Response) => {
  //             this._alertConfirmService.alert(error.json());
  //             return Observable.throw(error.json());
  //         });
  // }

  // upload(file: File): Observable<any> {
  //     let formData: FormData = new FormData();
  //     formData.append('MMSUploadFile', file, file.name);
  //     formData.append('toUrl', 'menu');

  //     return this._http.post(environment.serverUrl + "/file/upload", formData, new RequestOptions({
  //         headers: new Headers({
  //             'authorization': sessionStorage.getItem('token')
  //         })
  //     }))
  //         .map(res => res)
  //         .catch(error => Observable.throw(error))
  // }

}