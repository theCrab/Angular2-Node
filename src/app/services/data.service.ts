import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) { }


  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  getTemperatureList(): Observable<any> {
    return this.http.get('http://localhost:3000/temperature').map(res => res.json().obj);   
  }

  getWarmTemperatureList(): Observable<any> {
    return this.http.get('http://localhost:3000/temperature/warm').map(res => res.json().obj);   
  }

  //Alan:取得資料寫入資料庫
  getTemperature(): Observable<any> {
    return this.http.get('http://localhost:3000/temperature/load').map(res => res.json().obj);   
  }

  getCats(): Observable<any> {
    return this.http.get('http://localhost:3000/cat').map(res => res.json());
  }

  addCat(cat): Observable<any> {
    return this.http.post("http://localhost:3000/cat", JSON.stringify(cat), this.options);
  }

  editCat(cat): Observable<any> {
    return this.http.put(`http://localhost:3000/cat/${cat._id}`, JSON.stringify(cat), this.options);
  }

  deleteCat(cat): Observable<any> {
    return this.http.delete(`http://localhost:3000/cat/${cat._id}`, this.options);
  }

}
