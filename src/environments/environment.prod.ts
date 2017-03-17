
import { Http, Headers, Response, RequestOptions } from '@angular/http';

export const environment = {
  production: false,
  serverUrl: '',
  //Alan:未登入時的網址
  nonAuthenticationUrl: '/auth',
  mainPageUrl: '/index/run',
  systemName: 'Machine Ant',
  getRequestOptions(): RequestOptions {
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      })
    });
  }
};