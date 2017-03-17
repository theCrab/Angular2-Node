// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { Http, Headers, Response, RequestOptions } from '@angular/http';

export const environment = {
  production: false,
  serverUrl: 'http://localhost:3000',
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
